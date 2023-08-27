import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Button from './Button';
import Exercise from '../utils/Exercise';

interface ExerciseItemProps {
  exercise: Exercise;
  unit: string;
  increaseWeight: any;
  decreaseWeight: any;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  unit,
  increaseWeight,
  decreaseWeight,
}: ExerciseItemProps) => {
  const styles = StyleSheet.create({
    container: {
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(255,255,255,0.05)',
      flexDirection: 'row',
      alignSelf: 'stretch',
      marginBottom: 10,
    },
    cell: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'stretch',
      marginHorizontal: 10,
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
      fontFamily: 'Menlo-Regular',
    },
    subtitle: {
      fontWeight: '500',
      color: 'white',
      fontSize: 12,
      fontFamily: 'Menlo-Regular',
    },
  });

  const weight = +exercise.weight ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.cell}>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.subtitle}>
          {exercise.sets} x {exercise.reps}
        </Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.subtitle}>
          {weight}
          {unit}
        </Text>
      </View>
      <Button
        width={35}
        height={35}
        marginRight={5}
        title="-"
        onPress={decreaseWeight}
      />
      <Button width={35} height={35} title="+" onPress={increaseWeight} />
    </View>
  );
};

export default ExerciseItem;
