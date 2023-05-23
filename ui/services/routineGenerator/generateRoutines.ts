import getRoutines from "../../sql/getRoutines";
import getExercises from "../../sql/getExercises";
import Exercise from "../../utils/Exercise";
import Routine from "../../utils/Routine";

const convertToRoutineObject = async (workout: string, routineName: string): Promise<Routine> => {
    const exercises: Exercise[] = await getExercises(workout, routineName);
    const routine: Routine = {name: routineName, exercises: exercises};

    return routine;
}

const generateRoutines = async (workout: string): Promise<Routine[]> => {
    const routineNames: string[] = await getRoutines(workout);
    const routines: Routine[] = [];

    for (const routineName of routineNames) {
        const routine = await convertToRoutineObject(workout, routineName);
        routines.push(routine);
    }

    return routines;
};

export default generateRoutines;