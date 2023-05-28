import AsyncStorage from '@react-native-async-storage/async-storage';

const setDefaultWorkout = async (workout: string): Promise<void> => {
  await AsyncStorage.setItem('DEFAULT_WORKOUT', workout);
};

export default setDefaultWorkout;
