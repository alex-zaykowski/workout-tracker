import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, Alert, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import Button from '../components/Button';
import getWeightIncrement from '../services/asyncStorage/getWeightIncrement';
import setWeightIncrementAsync from '../services/asyncStorage/setWeightIncrement';
import getWorkouts from '../sql/getWorkouts';
import setDefaultWorkout from '../services/asyncStorage/setDefaultWorkout';
import deleteWorkout from '../sql/deleteWorkout';
import Workout from '../utils/Workout';

const SettingsScreen: React.FC<any> = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [weightIncrement, setWeightIncrement] = useState<string>('0');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<string[]>([]);

  const fetchWorkouts = async () => {
    getWorkouts()
      .then((res: Workout[]) => {
        const names: string[] = res.map((workout) => workout.name);
        setWorkouts(names);
      })
      .catch((err: Error) => Alert.alert('Error', err.message));
  };

  const setWeightIncrementAlert = () => {
    Alert.prompt(
      'Enter Weight Increment',
      '',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Set',
          onPress: async (weight) => {
            try {
              await setWeightIncrementAsync(+weight);
              setWeightIncrement(weight);
            } catch (err) {
              Alert.alert('Error', err.message);
            }
          },
        },
      ],
      'plain-text',
      `${weightIncrement}`
    );
  };

  useEffect(() => {
    const getWeight = async () => {
      const weight = await getWeightIncrement();
      setWeightIncrement(weight.toString());
    };

    getWeight();
  }, [weightIncrement]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d0d0d',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    modalContainer: {
      backgroundColor: '#0d0d0d',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      justifyContent: 'center',
    },
    buttonContainer: {
      alignSelf: 'center',
      flexDirection: 'column',
    },
    list: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    button: {
      width: 200,
      height: 40,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Create"
          width={styles.button.width}
          height={styles.button.height}
          marginBottom={styles.button.marginBottom}
          onPress={() => navigation.navigate('create')}
        />
        <Button
          title="Workout Programs"
          width={styles.button.width}
          height={styles.button.height}
          marginBottom={styles.button.marginBottom}
          onPress={async () => {
            await fetchWorkouts();
            setModalVisible(true);
          }}
        />
        <Button
          title="Set Weight Increment"
          width={styles.button.width}
          height={styles.button.height}
          marginBottom={styles.button.marginBottom}
          onPress={() => setWeightIncrementAlert()}
        />
      </View>
      <GestureRecognizer onSwipeDown={() => setModalVisible(false)}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={styles.modalContainer}
        >
          <View style={styles.modalContainer}>
            <View style={styles.buttonContainer}>
              <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={(item) => item}
                data={workouts}
                renderItem={({ item }) => (
                  <Button
                    title={item}
                    width={styles.button.width}
                    height={styles.button.height}
                    marginBottom={styles.button.marginBottom}
                    onPress={() => {
                      Alert.alert(item, '', [
                        {
                          text: 'Set as Default',
                          onPress: async () => {
                            await setDefaultWorkout(item);
                          },
                        },
                        {
                          text: 'Delete',
                          onPress: () => {
                            Alert.alert('Are you sure?', '', [
                              {
                                text: 'Yes',
                                onPress: async () => {
                                  await deleteWorkout(item);
                                  await fetchWorkouts();
                                },
                              },
                              {
                                text: 'No',
                              },
                            ]);
                          },
                        },
                        {
                          text: 'Cancel',
                        },
                      ]);
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
};

export default SettingsScreen;
