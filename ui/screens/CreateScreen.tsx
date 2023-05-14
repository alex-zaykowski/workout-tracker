import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
} from "react-native";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import CreateWorkout from "../sql/CreateWorkout";
import { useState } from "react";
import Button from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

const routineTemplate = `name: "Workout 1"
unit: kg
routines:
  - A
  - B
  - C
A:
  - {name: "squat", sets: 3, reps: 5}
`;

const CreateScreen = ({ navigation }) => {
  const [routineData, setRoutineData] = useState<string>("");

  const setRoutine = () => {
    CreateWorkout(routineData);
  };

  const create = () => {
    setRoutine();
    navigation.navigate("home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Button
            width={120}
            title="+ Done"
            onPress={() => create()}
          />
        </View>
        <ScrollView keyboardDismissMode="on-drag">
          <CodeEditor
            style={{
              width: "100%",
              fontSize: 14,
              inputLineHeight: 20,
              height: "100%",
              highlighterLineHeight: 20,
              backgroundColor: "#0d0d0d",
            }}
            language="yaml"
            syntaxStyle={CodeEditorSyntaxStyles.gruvboxDark}
            initialValue={routineTemplate}
            showLineNumbers
            onChange={setRoutineData}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  nav: {
    justifyContent: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    height: "100%",
  },
  buttonIcon: {
    marginRight: 3,
  },
});

export default CreateScreen;
