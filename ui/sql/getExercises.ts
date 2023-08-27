import { openDatabase } from 'expo-sqlite';
import Exercise from '../utils/Exercise';
import Workout from '../utils/Workout';

const getExercises = (workout: Workout, routine: string): Promise<Exercise[]> => new Promise<Exercise[]>((resolve, reject) => {
  const db = openDatabase('db');
  const exercises: Exercise[] = [];

  db.transaction(
    (tx) => {
      tx.executeSql(
        `
          SELECT *
          FROM exercises 
          WHERE workout = '${workout.name}' AND routine = '${routine}'`,
        null,
        (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const rows = result.rows._array;
          rows.forEach((row: Exercise) => {
            const exercise: Exercise = row;
            exercise.unit = workout.unit;
            exercises.push(exercise);
          });
          resolve(exercises);
        },
      );
    },
    (err) => {
      reject(err.message);
    },
  );
});

export default getExercises;
