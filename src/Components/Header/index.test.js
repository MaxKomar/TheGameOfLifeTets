import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Header} from "./index";

describe('Header component test', () => {

  const onReset = jest.fn();
  const onNextTick = jest.fn();
  const onToggleSimulationRun = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should display `run` and `next tick` buttons and hide `pause`', () => {
    const { getByTestId, queryByTestId } = render(<Header onReset={onReset} isSimulationRunning={false}
                                                          onNextTick={onNextTick}
                                                          onToggleSimulationRun={onToggleSimulationRun}/>);

    expect(getByTestId('run')).toBeTruthy();
    expect(getByTestId('next')).toBeTruthy();
    expect(queryByTestId('pause')).toBeNull();
  });

  test('Should display `pause` and hide `run`, `next` buttons', () => {
    const { getByTestId, queryByTestId } = render(<Header onReset={onReset} isSimulationRunning={true}
                                                          onNextTick={onNextTick}
                                                          onToggleSimulationRun={onToggleSimulationRun}/>);

    expect(getByTestId('pause')).toBeTruthy();
    expect(queryByTestId('run')).toBeNull();
    expect(queryByTestId('next')).toBeNull();
  });

  test('Should call callback for `run`, `next`, `reset` buttons click', () => {
    const { getByTestId } = render(<Header onReset={onReset} isSimulationRunning={false}
                                                          onNextTick={onNextTick}
                                                          onToggleSimulationRun={onToggleSimulationRun}/>);

    fireEvent.click(getByTestId('run'))
    expect(onToggleSimulationRun).toHaveBeenCalled();

    fireEvent.click(getByTestId('next'))
    expect(onNextTick).toHaveBeenCalled();

    fireEvent.click(getByTestId('reset'))
    expect(onReset).toHaveBeenCalled();
  });

  test('Should call callback for `pause` button click', () => {
    const { getByTestId } = render(<Header onReset={onReset} isSimulationRunning={true}
                                           onNextTick={onNextTick}
                                           onToggleSimulationRun={onToggleSimulationRun}/>);

    fireEvent.click(getByTestId('pause'))
    expect(onToggleSimulationRun).toHaveBeenCalled();
  });
})