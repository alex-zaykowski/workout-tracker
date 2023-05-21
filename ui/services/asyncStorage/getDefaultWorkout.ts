import AsyncStorage from '@react-native-async-storage/async-storage';

const getDefaultWorkout = async (): Promise<string> => {
    try {
      const workout = await AsyncStorage.getItem('DEFAULT_WORKOUT');

      if(workout != null) {
        return workout;
      }

      throw Error('No default workout set');
    } catch (error) {
      return '';
  }
}

export default getDefaultWorkout;
