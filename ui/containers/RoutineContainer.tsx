import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import Exercise from "../utils/Exercise";
import getExercises from "../sql/getExercises";
import ExerciseItem from "../components/ExerciseItem";
import Routine from "../utils/Routine";

interface Props {
  routine: Routine;
  changeWeight: Function;
}

const RoutineContainer: React.FC<Props> = (props: Props) => {
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
      fontFamily: "Menlo-Regular",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.routineName}>{props.routine.name}:</Text>
        {props.routine.exercises?.map((exercise: Exercise, index: number) => (
          <ExerciseItem
            key={index}
            exercise={exercise}
            unit={"lbs"}
            increaseWeight={() => {
              props.changeWeight(exercise, true);
            }}
            decreaseWeight={() => {
              props.changeWeight(exercise, false);
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default RoutineContainer;
