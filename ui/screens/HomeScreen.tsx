import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Button from '../components/Button';
import getDefaultWorkout from '../services/asyncStorage/getDefaultWorkout';
import setExerciseWeight from '../sql/setExerciseWeight';
import getWeightIncrement from '../services/asyncStorage/getWeightIncrement';
import RoutineContainer from '../containers/RoutineContainer';
import Exercise from '../utils/Exercise';
import generateRoutines from '../services/routineGenerator/generateRoutines';
import Routine from '../utils/Routine';
import Workout from '../utils/Workout';
import getWorkout from '../sql/getWorkout';

const HomeScreen: React.FC<any> = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [routines, setRoutines] = useState<Routine[]>();
  const [defaultWorkout, setDefaultWorkout] = useState<Workout>();
  const [weightIncrement, setWeightIncrement] = useState<number>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      const loadProgramData = async () => {
        const workoutName: string = await getDefaultWorkout();

        try {
          const workout: Workout = await getWorkout(workoutName);
          setDefaultWorkout(workout);

          const workoutRoutines: Routine[] = await generateRoutines(workout);
          setRoutines(workoutRoutines);
        } catch (ex) {
          setRoutines(null);
        }

        const increment: number = await getWeightIncrement();
        setWeightIncrement(increment);
      };

      loadProgramData();
    }
  }, [isFocused, count]);

  const changeExerciseWeight = async (
    exercise: Exercise,
    positive: boolean
  ) => {
    const newWeight =
      positive === true
        ? exercise.weight + weightIncrement
        : exercise.weight - weightIncrement;
    await setExerciseWeight(newWeight, exercise.name, defaultWorkout.name);
    setCount(count + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      flexDirection: 'column',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: '#0d0d0d',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 20,
    },
    scrollView: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Button
          title="+ Options"
          width={100}
          height={40}
          onPress={() => navigation.navigate('settings')}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <RoutineContainer
          workout={defaultWorkout}
          routines={routines}
          weightChangeFunction={changeExerciseWeight}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
