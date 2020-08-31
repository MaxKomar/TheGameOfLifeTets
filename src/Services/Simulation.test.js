import SimulationService from './Simulation';
import {squareExample, nextTickResultCondition, nextTickStartCondition} from './testData'

describe('Simulation service tests', () => {

  test('Should create generation with dimensions 5*5', ()=> {
    const generation = SimulationService.createInitialGeneration(5, 5);
    expect(generation).toHaveLength(5);
    expect(generation[4]).toHaveLength(5)
  })

  test('should return same simulation', () => {
    expect(SimulationService.getNextGeneration(squareExample)).toEqual(squareExample);
  })

  test('should return next tick result', () => {
      expect(SimulationService.getNextGeneration(nextTickStartCondition)).toEqual(nextTickResultCondition)
  })
})