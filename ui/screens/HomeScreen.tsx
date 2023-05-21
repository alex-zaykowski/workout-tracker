import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, SafeAreaView, ScrollView } from 'react-native';
import Button from '../components/Button';
import { UserContext } from '../utils/UserContext';
import getRoutines from '../sql/getRoutines';
import { useIsFocused } from '@react-navigation/native';
import RoutineContainer from '../containers/RoutineContainer';
import getDefaultWorkout from '../services/asyncStorage/getDefaultWorkout';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const user = useContext(UserContext);

  const [routines, setRoutines] = useState<string[]>([]);
  const [defaultWorkout, setDefaultWorkout] = useState<string>();

  const fetchDefaultWorkout = async () => {
    const workout = await getDefaultWorkout();
    setDefaultWorkout(workout);

    console.log(defaultWorkout);
  }

  useEffect(() => {
    if(isFocused) {
      fetchDefaultWorkout();

      getRoutines('Workout 1').then((res: string[]) => {
        setRoutines(res);
      }).catch((err: Error) => {
          console.log('no routines found');
      });
    }
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
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 20,
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
      <SafeAreaView>
        <ScrollView>
          {
            routines?.map((routine: string, index: number) => (
              <RoutineContainer key={index} workout='Workout 1' routine={routine} />
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
