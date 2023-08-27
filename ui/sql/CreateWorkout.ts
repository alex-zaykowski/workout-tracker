import { openDatabase } from 'expo-sqlite';
import Exercise from '../utils/Exercise';
import Parser from '../yaml/parser';

const CreateWorkout = (yaml: string): Promise<void> => new Promise<void>((resolve, reject) => {
  const parser = new Parser(yaml);
  const db = openDatabase('db');

  const unit: string = parser.getUnit();

  try {
    const workoutName: string = parser.getName();
    const routines: string[] = parser.getRoutines();
    const exercises: Exercise[] = parser.getExercises();

    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS workouts (name VARCHAR(70) PRIMARY KEY, unit CHAR(3) NOT NULL);'
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS routines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(70), 
            workout VARCHAR(70) NOT NULL,
            UNIQUE(name, workout),
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
            UNIQUE(name, workout, routine),
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
              '${exercise.reps ?? 0}',
              '${exercise.sets ?? 0}',
              '${exercise.weight ?? 0}',
              '${exercise.time ?? 0}'
            );`);
        });

        resolve();
      },
      (err) => {
        reject(err);
      },
    );
  }catch(err){
    throw new Error(err.message);
  }
});

export default CreateWorkout;
