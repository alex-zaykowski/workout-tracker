import { openDatabase } from 'expo-sqlite';
import Routine from '../utils/Routine';

const getRoutines = (workout: string): Promise<string[]> => new Promise<string[]>((resolve, reject) => {
  const db = openDatabase('db');
  const routines: string[] = [];

  db.transaction(
    (tx) => {
      tx.executeSql(
        `
          SELECT DISTINCT name
          FROM routines
          WHERE workout = '${workout}'`,
        null,
        (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const rows = result.rows._array;
          rows.forEach((row: Routine) => {
            routines.push(row.name);
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
