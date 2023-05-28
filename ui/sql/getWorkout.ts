import { openDatabase } from 'expo-sqlite';
import Workout from '../utils/Workout';

const getWorkout = (name: string): Promise<Workout> => new Promise<Workout>((resolve, reject) => {
  const db = openDatabase('db');

  db.transaction(
    (tx) => {
      tx.executeSql(
        `
          SELECT *
          FROM workouts
          WHERE name = '${name}'
          `,
        null,
        (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const rows = result.rows._array;
          const workout: Workout = rows[0];

          resolve(workout);
        },
      );
    },
    (err) => {
      reject(err);
    },
  );
});

export default getWorkout;
