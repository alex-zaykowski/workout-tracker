import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Button from '../components/Button';
import { UserContext } from '../utils/UserContext';
import ExerciseItem from '../components/ExerciseItem';
import Exercise from '../utils/Exercise';
import getRoutines from '../sql/getRoutines';
import { useIsFocused } from '@react-navigation/native';
import RoutineContainer from '../containers/RoutineContainer';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const user = useContext(UserContext);

  const dummyExercise: Exercise = {name: "Bench", routine: "A", sets: 3, reps: 5, weight: 180};
  const [routines, setRoutines] = useState<string[]>([]);

  useEffect(() => {
    if(isFocused) {
      getRoutines('Workout 1').then((res: string[]) => {
        setRoutines(res);
      }).catch((err: Error) => {
          Alert.alert('Error Fetching Routines', err.message);
      });
    }
    console.log(routines);
  }, [isFocused]);

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
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Button
          title='+ Options'
          width={100}
          height={40}
          onPress={() => navigation.navigate('settings')}
        />
      </View>
      {
        routines?.map((routine: string, index: number) => (
          <RoutineContainer key={index} workout='Workout 1' routine={routine} />
        ))
      }
    </View>
  );
};

export default HomeScreen;
