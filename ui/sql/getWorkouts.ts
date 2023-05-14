import { openDatabase } from "expo-sqlite";

const getWorkouts: Promise<string[]> = new Promise((resolve, reject) => {
  const db = openDatabase("db");
  const workouts: string[] = [];

  db.transaction(
    tx => {
      tx.executeSql('SELECT name FROM workouts;', 
        null,
        (_, result) => {
          const rows = result.rows._array;
          rows.forEach(row => {
            workouts.push(row["name"]);
          });
          resolve(workouts);
        }
      );
    },
    (err) => {
      reject(err);
    }
  );
});

export default getWorkouts;
