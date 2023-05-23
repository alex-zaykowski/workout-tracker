import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/native";
import RoutineContainer from "../containers/RoutineContainer";
import getDefaultWorkout from "../services/asyncStorage/getDefaultWorkout";
import setExerciseWeight from "../sql/setExerciseWeight";
import getWeightIncrement from "../services/asyncStorage/getWeightIncrement";
import Exercise from "../utils/Exercise";
import generateRoutines from "../services/routineGenerator/generateRoutines";
import Routine from "../utils/Routine";

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [routines, setRoutines] = useState<Routine[]>();
  const [defaultWorkout, setDefaultWorkout] = useState<string>();
  const [weightIncrement, setWeightIncrement] = useState<number>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      const loadProgramData = async () => {
        const workout = await getDefaultWorkout();
        setDefaultWorkout(workout);

        const workoutRoutines = await generateRoutines(defaultWorkout);
        setRoutines(workoutRoutines);

        const increment = await getWeightIncrement();
        setWeightIncrement(+increment);
      };
      loadProgramData();
    }
  }, [isFocused, defaultWorkout, count]);

  const changeExerciseWeight = async (
    exercise: Exercise,
    positive: boolean
  ) => {
    const newWeight =
      positive === true
        ? exercise.weight + weightIncrement
        : exercise.weight - weightIncrement;
    await setExerciseWeight(newWeight, exercise.name, defaultWorkout);
    setCount(count + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0d0d0d",
      flexDirection: "column",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    navBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      backgroundColor: "#0d0d0d",
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
          onPress={() => navigation.navigate("settings")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {routines?.map((routine: Routine, index: number) => (
          <RoutineContainer
            key={index}
            routine={routine}
            changeWeight={changeExerciseWeight}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
