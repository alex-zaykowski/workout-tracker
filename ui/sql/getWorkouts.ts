import { openDatabase } from "expo-sqlite";
import Workout from "../utils/Workout";

const getWorkouts = (): Promise<Workout[]> => { 

  return new Promise((resolve, reject) => {
    const db = openDatabase("db");
    const workouts: Workout[] = [];

    db.transaction(
      tx => {
        tx.executeSql('SELECT name FROM workouts;', 
          null,
          (_, result) => {
            const rows = result.rows._array;
            rows.forEach((workout: Workout) => {
              workouts.push(workout);
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
}

export default getWorkouts;
