import { openDatabase } from "expo-sqlite";

const getRoutines = (workout: string): Promise<string[]> => {

  return new Promise<string[]>((resolve, reject) => {
    const db = openDatabase("db");
    const routines: string[] = [];

    db.transaction(
      tx => {
        tx.executeSql(`
          SELECT DISTINCT name
          FROM routines
          WHERE workout = '${workout}'`, 
          null,
          (_, result) => {
            const rows = result.rows._array;
            rows.forEach((row: string) => {
              routines.push(row["name"]);
            });
            resolve(routines);
          }
        );
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export default getRoutines;

