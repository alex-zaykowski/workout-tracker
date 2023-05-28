import AsyncStorage from '@react-native-async-storage/async-storage';

const setWeightIncrementAsync = async (weight: number): Promise<void> => {
  if (!weight) {
    throw Error('Weight increment must be a valid number');
  }

  if (weight > 100) {
    throw Error('Weight increment cannot exceed 100');
  }

  if (weight < 0) {
    throw Error('Weight increment cannot be a negative value');
  }

  await AsyncStorage.setItem('WEIGHT_INCREMENT', weight.toString());
};

export default setWeightIncrementAsync;
