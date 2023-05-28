import getRoutines from "../../sql/getRoutines";
import getExercises from "../../sql/getExercises";
import Exercise from "../../utils/Exercise";
import Routine from "../../utils/Routine";
import Workout from "../../utils/Workout";

const convertToRoutineObject = async (workout: Workout, routineName: string): Promise<Routine> => {
    const exercises: Exercise[] = await getExercises(workout, routineName);
    const routine: Routine = {name: routineName, exercises: exercises};

    return routine;
}

const generateRoutines = async (workout: Workout): Promise<Routine[]> => {
    const routineNames: string[] = await getRoutines(workout.name);
    const routines: Routine[] = [];

    for (const routineName of routineNames) {
        const routine = await convertToRoutineObject(workout, routineName);
        routines.push(routine);
    }

    return routines;
};

export default generateRoutines;