import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Exercise from '../utils/Exercise';
import getExercises from '../sql/getExercises';
import ExerciseItem from '../components/ExerciseItem';

interface Props {
  routine: string;
  workout: string;
}

const RoutineContainer: React.FC<Props> = (props: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>();

  useEffect(() => {
    getExercises(props.workout, props.routine).then((res: Exercise[]) => {
      setExercises(res);
      console.log(exercises);
    }).catch((err: Error) => Alert.alert('Error', err.message));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      padding: 10,
    },
    list: {
      width: "100%",

    },
    routineName: {
      color: "red",
      fontWeight: "bold",
      fontFamily: 'Menlo-Regular',
    }
  });

  return(
    <View style={styles.container}>
      <View style={styles.list}>
      <Text style={styles.routineName}>{props.routine}:</Text>
      {
        exercises?.map((exercise: Exercise, index: number) => (
          <ExerciseItem key={index} exercise={exercise} unit={'lbs'}/>
        ))
      }
      </View>
    </View>
  );
}

export default RoutineContainer;
