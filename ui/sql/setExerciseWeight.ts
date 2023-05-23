import { openDatabase } from "expo-sqlite";

const setExerciseWeight = (weight: number, name: string, workout: string): Promise<void> => { 
  
  return new Promise((resolve, reject) => {
    const db = openDatabase("db");

    db.transaction(
      tx => {
        tx.executeSql(`
          UPDATE exercises
          SET weight = ${weight}
          WHERE name = '${name}' AND workout ='${workout}';
          `,
          undefined,
          () => {
            resolve();
          }
        );
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export default setExerciseWeight;
