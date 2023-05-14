import { openDatabase } from "expo-sqlite";
import Exercise from "../utils/Exercise";

const getExercises = (workout: string, routine: string): Promise<Exercise[]> => {

  return new Promise<Exercise[]>((resolve, reject) => {
    const db = openDatabase("db");
    const exercises: Exercise[] = [];

    db.transaction(
      tx => {
        tx.executeSql(`
          SELECT *
          FROM exercises 
          WHERE workout = '${workout}' AND routine = '${routine}'`, 
          null,
          (_, result) => {
            const rows = result.rows._array;
            rows.forEach((row: Exercise) => {
              exercises.push(row);
            });
            resolve(exercises);
          }
        );
      },
      (err) => {
        console.log(err.message);
        reject(err.message);
      }
    );
  });
}

export default getExercises;
