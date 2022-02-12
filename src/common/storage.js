import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async getItem(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  },
  async setItem(key, data) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  },
};

export const consoleStorage = {
  getItem: key => {
    console.log('GET_ITEM', key);
  },
  setItem: (key, value) => {
    console.log('SET_ITEM', key, value);
  },
  removeItem: key => {
    console.log('REMOVE_ITEM', key);
  },
};
