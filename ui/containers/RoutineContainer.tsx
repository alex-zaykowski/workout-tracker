import { Text, StyleSheet } from 'react-native';
import React from 'react';
import Routine from '../utils/Routine';
import Workout from '../utils/Workout';
import RoutineDisplay from '../components/RoutineDisplay';

interface Props {
  routines: Routine[];
  workout: Workout;
  weightChangeFunction: any;
}

const RoutineContainer: React.FC<Props> = ({
  routines,
  workout,
  weightChangeFunction,
}: Props) => {
  const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontFamily: 'Menlo-Regular',
      alignSelf: 'center',
      fontSize: 12,
    },
  });

  if (!routines) {
    return <Text style={styles.text}>No workout routine loaded.</Text>;
  }

  return (
    <>
      {routines.map((routine: Routine) => (
        <RoutineDisplay
          key={routine.id}
          workout={workout}
          routine={routine}
          changeWeight={weightChangeFunction}
        />
      ))}
    </>
  );
};

export default RoutineContainer;
