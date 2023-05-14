import Exercise from '../utils/Exercise';
import YAML from 'yaml';

export default class Parser {
  workoutSpec: any; // this seems to be the return type of YAML.parse (https://eemeli.org/yaml/#yaml-parse)
 
  //TODO: Write validator (e.g: check for duplicate keys and missing keys) 
  constructor(data: string){
    this.workoutSpec = YAML.parse(data);
  }

  getName() {
    const name: string = this.workoutSpec['name'];

    if(!name) {
      throw new Error('Name for workout must be specified');
    }

    return name;
  }

  getUnit() {
    const unit: string = this.workoutSpec['unit'];
    
    if(!unit) {
      return 'lb';
    }

    if(unit.localeCompare('kg', 'en', {sensitivity: 'base'}) === 0) {
      return 'kg';
    }

    if(unit.localeCompare('lb', 'en', {sensitivity: 'base'}) === 0) {
      return 'lb';
    }

    throw new Error(`Unrecognized unit, must be either "lb" or "kg" recieved ${unit}`);
  }

  getRoutines() {
    const routines: string[] = this.workoutSpec['routines'];

    if(!routines) {
      throw new Error('Routines not specified');
    }

    return routines;
  }

  getExercises() {
    const routines: string[] = this.getRoutines();
    const exerciseList: Exercise[] = [];

    routines.forEach(routine => {
      const exercises = this.workoutSpec[routine];

      if(exercises === undefined) {
        return;
      }

      exercises.forEach((exercise: Exercise) => {  
        if(exercise) {
          exercise.routine = routine;
          exerciseList.push(exercise as Exercise);
        }
      });

    });

    return exerciseList;
  }
}
