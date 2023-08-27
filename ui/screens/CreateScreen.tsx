import {
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
} from 'react-native';
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import CreateWorkout from '../sql/createWorkout';
import Button from '../components/Button';

const routineTemplate = `name: "Workout 1"
unit: kg
routines:
  - A
  - B
  - C
A:
  - {name: "squat", sets: 3, reps: 5}
`;

const CreateScreen: React.FC<any> = ({ navigation }: any) => {
  const [routineData, setRoutineData] = useState<string>('');
  const insets = useSafeAreaInsets();

  const create = async () => {
    try {
      await CreateWorkout(routineData);
      navigation.navigate('home');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    nav: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: '#0d0d0d',
      paddingLeft: 10,
      paddingRight: 10,
    },
    buttonIcon: {
      marginRight: 3,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Button
            width={100}
            height={40}
            title="+ Done"
            onPress={async () => create()}
          />
        </View>
        <ScrollView keyboardDismissMode="on-drag">
          <CodeEditor
            style={{
              width: '100%',
              fontSize: 14,
              inputLineHeight: 20,
              height: '100%',
              highlighterLineHeight: 20,
              backgroundColor: '#0d0d0d',
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

export default CreateScreen;
