// @flow
import React, {useCallback, useState, useEffect} from 'react';
import Normalize from 'react-normalize'
import {Header, Grid} from "Components";
import SimulationService from "Services/Simulation";
import type {Generation} from "Services/Simulation";
import useSimulationInterval from "./Hooks/useSimulationInterval";



const App = () => {
  const [generation, setGeneration] = useState<Generation>([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);

  useEffect(() => {
    setGeneration(SimulationService.createInitialGeneration())
  }, [setGeneration]);

  useSimulationInterval(() => {
    setGeneration(SimulationService.getNextGeneration(generation));
  }, isSimulationRunning)

  const resetSimulation = useCallback(() => {
    setIsSimulationRunning(false);
    setGeneration(SimulationService.createInitialGeneration());
  }, []);

  const nextTick = useCallback(() => {
    setGeneration(SimulationService.getNextGeneration(generation))
  }, [generation]);

  const toggleSimulationRun = useCallback(() => {
    setIsSimulationRunning(!isSimulationRunning)
  }, [isSimulationRunning]);

  return (
    <>
      <Normalize/>
      <Header onReset={resetSimulation}
              onNextTick={nextTick}
              onToggleSimulationRun={toggleSimulationRun}
              isSimulationRunning={isSimulationRunning}/>
      {generation && <Grid generation={generation}/>}
    </>
  );
};

export default App;
