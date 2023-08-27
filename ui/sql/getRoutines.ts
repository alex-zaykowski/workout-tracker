import { openDatabase } from 'expo-sqlite';
import Routine from '../utils/Routine';

const getRoutines = (workout: string): Promise<Routine[]> => new Promise<Routine[]>((resolve, reject) => {
  const db = openDatabase('db');
  const routines: Routine[] = [];

  db.transaction(
    (tx) => {
      tx.executeSql(
        `
          SELECT *
          FROM routines
          WHERE workout = '${workout}'`,
        null,
        (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const rows = result.rows._array;
          rows.forEach((routine: Routine) => {
            routines.push(routine);
          });
          resolve(routines);
        },
      );
    },
    (err) => {
      reject(err);
    },
  );
});

export default getRoutines;
