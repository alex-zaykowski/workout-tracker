import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Workout from '../utils/Workout';
import Exercise from '../utils/Exercise';
import ExerciseItem from './ExerciseItem';
import Routine from '../utils/Routine';

interface Props {
  workout: Workout;
  routine: Routine;
  changeWeight: Function;
}

const RoutineDisplay: React.FC<Props> = ({
  workout,
  routine,
  changeWeight,
}: Props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      padding: 10,
    },
    list: {
      width: '100%',
    },
    routineName: {
      color: 'red',
      fontWeight: 'bold',
      fontFamily: 'Menlo-Regular',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.routineName}>{routine.name}:</Text>
        {routine.exercises?.map((exercise: Exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            unit={workout.unit}
            increaseWeight={() => {
              changeWeight(exercise, true);
            }}
            decreaseWeight={() => {
              changeWeight(exercise, false);
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default RoutineDisplay;
