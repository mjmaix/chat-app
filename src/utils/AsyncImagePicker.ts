import RNImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import { info, error } from '../core';
import { Storage } from 'aws-amplify';

const { fs } = RNFetchBlob;

const avatarOptions = {
  title: 'Select Avatar',
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class AsyncImagePicker {
  public response: Nullable<ImagePickerResponse> = null;

  private loadAssetToBase64 = async (filePath: string) => {
    let sureFilePath = filePath;

    if (Platform.OS === 'ios') {
      info(`Read file: ${filePath}`);
      sureFilePath = filePath.replace('file:/', '');
    }
    try {
      const data = await fs.readFile(sureFilePath, 'base64');
      return data;
    } catch (err) {
      error(err);
      return null;
    }
  };

  public uploadImage = async () => {
    if (!this.response) {
      throw new Error('No image selected');
    }
    const ext = 'jpeg';
    const { uri, fileSize, fileName } = this.response;

    const uploadFileName = `profile_picture.${ext}`;
    const data = await this.loadAssetToBase64(uri);

    const storageConfig: StorageConfig = {
      level: 'private',
      contentType: 'image/jpeg',
      progressCallback: ({ loaded, total }) => {
        console.log(`Uploaded: ${loaded}/${total}`);
      },
    };

    try {
      const storeResponse = await Storage.put(
        uploadFileName,
        data,
        storageConfig,
      );
      console.log(storeResponse);
    } catch (err) {
      console.error(err);
    }
  };

  public pickImage = async () => {
    return new Promise<Nullable<ImagePickerResponse>>((resolve, reject) => {
      RNImagePicker.showImagePicker(avatarOptions, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          resolve(null);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          reject(response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.response = response;
          resolve(response);
        }
      });
    });
  };
}
