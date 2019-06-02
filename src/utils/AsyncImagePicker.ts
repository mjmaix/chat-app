import RNImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import { info, error } from '../core';
import { Storage } from 'aws-amplify';
import { Buffer } from 'buffer';
import { getExt } from './getExt';

const { fs } = RNFetchBlob;

const avatarOptions = {
  title: 'Select Avatar',
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const defaultStorageConfig: StorageConfig = {
  level: 'private',
  contentType: 'image/jpeg',
  progressCallback: ({ loaded, total }) => {
    console.log(`Uploaded: ${loaded}/${total}`);
  },
};

export class AsyncImagePicker {
  public response: Nullable<ImagePickerResponse> = null;

  private static loadAssetToBase64 = async (filePath: string) => {
    let sureFilePath = filePath;

    if (Platform.OS === 'ios') {
      info(`Read file: ${filePath}`);
      sureFilePath = filePath.replace('file:/', '');
    }
    try {
      const data = await fs.readFile(sureFilePath, 'base64');
      return new Buffer(data, 'base64');
    } catch (err) {
      error(err);
      return null;
    }
  };

  // image: ImagePickerResponse
  public static uploadImage = async (
    imageUri: string,
    storageConfig = defaultStorageConfig,
  ) => {
    if (!imageUri) {
      throw new Error('No image selected');
    }

    const data = await AsyncImagePicker.loadAssetToBase64(imageUri);
    console.log('uploadImage imageUri', imageUri);
    console.log('uploadImage data', data);
    const uploadFileName = `profile_picture.${getExt(imageUri)}`;

    try {
      const result = await Storage.put(uploadFileName, data, storageConfig);
      const s3Key = (result as S3Object).key;
      console.log(result);
      return s3Key;
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  public showImagePicker = async () => {
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
