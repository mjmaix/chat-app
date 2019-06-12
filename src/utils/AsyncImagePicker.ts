import { Buffer } from 'buffer';

import { Storage } from 'aws-amplify';
import { Platform } from 'react-native';
import RNImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

import { logError, logInfo } from '../core/reports';
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
  progressCallback: undefined,
};

export class AsyncImagePicker {
  public response: Nullable<ImagePickerResponse> = null;

  private static loadAssetToBase64 = async (filePath: string) => {
    let sureFilePath = filePath;

    if (Platform.OS === 'ios') {
      logInfo(`Read file: ${filePath}`);
      sureFilePath = filePath.replace('file:/', '');
    }
    try {
      const data = await fs.readFile(sureFilePath, 'base64');
      return new Buffer(data, 'base64');
    } catch (err) {
      logError(err);
      return null;
    }
  };

  public static uploadImage = async (
    imageUri: string,
    storageConfig = defaultStorageConfig,
  ) => {
    if (!imageUri) {
      throw new Error('No image selected');
    }

    const data = await AsyncImagePicker.loadAssetToBase64(imageUri);
    const uploadFileName = `profile_picture.${getExt(imageUri)}`;

    try {
      logInfo(['Uploading', uploadFileName, storageConfig]);
      const result = await Storage.put(uploadFileName, data, storageConfig);
      const s3Key = (result as S3Object).key;
      return s3Key;
    } catch (err) {
      throw err;
    }
  };

  public showImagePicker = async () => {
    return new Promise<Nullable<ImagePickerResponse>>((resolve, reject) => {
      RNImagePicker.showImagePicker(avatarOptions, response => {
        // console.log('showImagePicker', response);
        if (response.didCancel) {
          resolve(null);
        } else if (response.error) {
          logError(['showImagePicker', response.error]);
          reject(response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          this.response = response;
          resolve(response);
        }
      });
    });
  };
}
