import AsyncStorage from '@react-native-async-storage/async-storage';

const getWeightIncrement = async (): Promise<number> => {
    try {
      const weight = await AsyncStorage.getItem('WEIGHT_INCREMENT');

      if(weight != null) {
        return +weight;
      }

      throw Error('No weight increment set');
    } catch (error) {
      return 0;
  }
}

export default getWeightIncrement;
