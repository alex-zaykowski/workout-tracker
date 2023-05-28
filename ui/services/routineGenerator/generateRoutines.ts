import getRoutines from '../../sql/getRoutines';
import getExercises from '../../sql/getExercises';
import Exercise from '../../utils/Exercise';
import Routine from '../../utils/Routine';
import Workout from '../../utils/Workout';

const convertToRoutineObject = async (workout: Workout, routine: Routine): Promise<Routine> => {
  const exercises: Exercise[] = await getExercises(workout, routine.name);
  const completeRoutine: Routine = { id: routine.id, name: routine.name, exercises };

  return completeRoutine;
};

const generateRoutines = async (workout: Workout): Promise<Routine[]> => {
  const routineData: Routine[] = await getRoutines(workout.name);
  const routinePromises: Promise<Routine>[] = routineData.map((data => convertToRoutineObject(workout, data)));
  const routines: Routine[] = await Promise.all(routinePromises);

  return routines;
};

export default generateRoutines;
