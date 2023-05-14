import {describe, expect, test} from '@jest/globals';
import Exercise from '../../utils/Exercise';
import Parser from '../parser';

describe('Parser.getName', () => {
  test('returns correct name', () => {
    const validWorkoutSpec = new Parser('name: test');

    expect(validWorkoutSpec.getName()).toBe('test');
  });
  test('throws error if missing name', () => {
    const invalidWorkoutSpec = new Parser('unit: kg');

    expect(() => {invalidWorkoutSpec.getName()}).toThrow();
  });
});

describe('Parser.getUnit', () => {
  test.each([
    ['unit: kg', 'kg'], 
    ['unit: lb', 'lb'],
    ['unit: KG', 'kg'],
    ['unit: LB', 'lb'],
    ])('spec with "%s" returns correct unit', (yaml, result) => {
      const validWorkoutSpec = new Parser(yaml);
      expect(validWorkoutSpec.getUnit()).toBe(result);
  });

  test('throws error when unknown unit', () => {
    const invalidWorkoutSpec = new Parser(`unit: asds`);

    expect(() => {invalidWorkoutSpec.getUnit()}).toThrow();
  });

  test('defaults to lb if no unit specified', () => {
    const workoutSpec = new Parser('name: test');

    expect(workoutSpec.getUnit()).toBe('lb');
  });
});

const validRoutines = `routines:
- A
- B
- C`;

describe('Parser.getRoutines', () => {
  test('returns correct routines', () => {
    const validWorkoutSpec = new Parser(validRoutines);

    const routines = validWorkoutSpec.getRoutines();

    expect(routines).toStrictEqual(["A", "B", "C"]);
  });
});


const validExercises = `name: "Workout 1"
unit: kg
routines:
  - A
  - B
  - C
A:
  - {name: "bench", sets: 3, reps: 5}
`;
//TODO: Add test cases for multiple exercises w/ same routine & multiple routines
describe('Parser.getExercises', () => {
  test('returns correct exercises', () => {
    const validExercisesSpec = new Parser(validExercises);

    const exercises = validExercisesSpec.getExercises();

    const expectedExercises: Exercise[] = [{name: "bench", routine: "A", sets: 3, reps: 5}];

    expect(exercises).toStrictEqual(expectedExercises);
  });
});
