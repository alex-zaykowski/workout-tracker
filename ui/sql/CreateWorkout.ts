import { openDatabase } from "expo-sqlite";
import Exercise from "../utils/Exercise";
import Parser from "../yaml/parser";

const CreateWorkout = (yaml: string) => {
  const parser = new Parser(yaml);
  const db = openDatabase("db");

  const unit: string = parser.getUnit();
  const workoutName: string = parser.getName();
  const routines: string[] = parser.getRoutines();
  const exercises: Exercise[] = parser.getExercises();

  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, default_workout VARCHAR(70));'
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS workouts (name VARCHAR(70) PRIMARY KEY, unit INTEGER NOT NULL);'
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS routines (
          name VARCHAR(70), 
          workout VARCHAR(70) NOT NULL,
          PRIMARY KEY (name, workout),
          FOREIGN KEY (workout)
            REFERENCES workouts (name)
        );`
      );

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          routine VARCHAR(70) NOT NULL,
          workout VARCHAR(70) NOT NULL,
          name VARCHAR(70) NOT NULL,
          reps INTEGER,
          sets INTEGER,
          weight INTEGER,
          time INTEGER,
          FOREIGN KEY (routine)
            REFERENCES routines (name)
          FOREIGN KEY (workout)
            REFERENCES workouts (name)
        );
      `);

      tx.executeSql(`INSERT INTO workouts(name, unit) VALUES('${workoutName}', '${unit}');`);
    
      routines.forEach((routine: string) => {
        tx.executeSql(`INSERT INTO routines(name, workout) VALUES('${routine}', '${workoutName}');`);
      });

      exercises.forEach((exercise: Exercise) => {
        tx.executeSql(`INSERT INTO exercises(
          routine,
          workout,
          name, 
          reps, 
          sets, 
          weight, 
          time) VALUES(
            '${exercise.routine}',
            '${workoutName}',
            '${exercise.name}',
            '${exercise.reps ?? ''}',
            '${exercise.sets ?? ''}',
            '${exercise.weight ?? ''}',
            '${exercise.time ?? ''}'
          );`);
      });
    },
    (err) => {
      console.log(err.message);
  });
}

export default CreateWorkout;
