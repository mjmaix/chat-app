import NetInfo from '@react-native-community/netinfo';

export const isConnected = async () => {
  const net = await NetInfo.fetch();

  return new Promise((resolve, reject) => {
    if (net.isConnected) {
      resolve();
    }
    reject();
  });
};
export const getNetInfo = () => NetInfo.fetch();
