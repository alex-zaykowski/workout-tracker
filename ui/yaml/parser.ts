import YAML from 'yaml';
import Exercise from '../utils/Exercise';

export default class Parser {
  workoutSpec: any; // this seems to be the return type of YAML.parse (https://eemeli.org/yaml/#yaml-parse)

  // TODO: Write validator (e.g: check for duplicate keys and missing keys)
  constructor(data: string) {
    this.workoutSpec = YAML.parse(data);
  }

  getName() {
    const { name } = this.workoutSpec;

    if (!name) {
      throw new Error('Name for workout must be specified');
    }

    return name;
  }

  getUnit() {
    const { unit } = this.workoutSpec;

    if (!unit) {
      return 'lb';
    }

    if (unit.localeCompare('kg', 'en', { sensitivity: 'base' }) === 0) {
      return 'kg';
    }

    if (unit.localeCompare('lb', 'en', { sensitivity: 'base' }) === 0) {
      return 'lb';
    }

    throw new Error(`Unrecognized unit, must be either "lb" or "kg" recieved ${unit}`);
  }

  getRoutines() {
    const {routines} = this.workoutSpec;

    if (!routines) {
      throw new Error('Routines not specified');
    }

    const routineSet = new Set(routines);

    if(routineSet.size !== routines.length){
      throw new Error('There cannot be duplicate routines')
    }

    return routines;
  }

  getExercises() {
    const routines: string[] = this.getRoutines();
    const exerciseList: Exercise[] = [];

    routines.forEach((routine) => {
      const exercises = this.workoutSpec[routine];

      if (exercises === undefined) {
        return;
      }

      exercises.forEach((exercise: Exercise) => {
        if (exercise) {
          const newExercise: Exercise = exercise;
          if(!newExercise.name){
            throw new Error('Exercise name must be defined');
          }
          newExercise.routine = routine;
          exerciseList.push(newExercise);
        }
      });
    });

    return exerciseList;
  }
}
