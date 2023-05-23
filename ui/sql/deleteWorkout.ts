import { openDatabase } from "expo-sqlite";

const deleteWorkout = (workout: string): Promise<void> => {

  return new Promise<void>((resolve, reject) => {
    const db = openDatabase("db");

    db.transaction(
      tx => {
        tx.executeSql(`
          DELETE FROM workouts
          WHERE name = '${workout}';`
        );

        tx.executeSql(`
          DELETE FROM routines
          WHERE workout = '${workout}';`
        );

        tx.executeSql(`
          DELETE FROM exercises
          WHERE workout = '${workout}';`
        );

        resolve();
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export default deleteWorkout;
