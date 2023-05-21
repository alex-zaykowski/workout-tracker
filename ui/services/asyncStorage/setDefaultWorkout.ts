import AsyncStorage from '@react-native-async-storage/async-storage';

const setDefaultWorkout= async (workout: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('DEFAULT_WORKOUT', workout);
    } catch(error) {
      throw error;
  }
}

export default setDefaultWorkout;
