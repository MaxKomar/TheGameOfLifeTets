import React from 'react';
import {render, fireEvent, act, cleanup} from '@testing-library/react'
import App from './App';
import SimulationService from 'Services/Simulation'

jest.useFakeTimers();

describe('App test', () => {

  let createGenerationSpy;
  let getNextGenerationSpy;

  beforeEach(() => {
    createGenerationSpy = jest.fn().mockReturnValue([[0,0,0], [0,0,0], [0,0,0]]);
    getNextGenerationSpy = jest.fn().mockReturnValue([[0,0,0], [0,0,0], [0,0,0]]);

    SimulationService.getNextGeneration = getNextGenerationSpy;
    SimulationService.createInitialGeneration = createGenerationSpy;
  })

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  })

  test('Should run app, display pause button and get next generation, then pause run', () => {
    const { getByTestId } = render(<App/>);

    act(() => {
      fireEvent.click(getByTestId('run'));
      jest.advanceTimersByTime(1000)
    });

    expect(getByTestId('pause')).toBeTruthy();
    expect(getNextGenerationSpy).toHaveBeenCalledTimes(3);

    act(() => {
      fireEvent.click(getByTestId('pause'));
      jest.advanceTimersByTime(1000)
    })

    expect(getNextGenerationSpy).toHaveBeenCalledTimes(3);
  });

  test('Should create initial generation', () => {
    render(<App/>);
    expect(createGenerationSpy).toHaveBeenCalledTimes(1);
  });

  test('Should reset initial generation', () => {
    const { getByTestId } = render(<App/>);

    fireEvent.click(getByTestId('reset'))

    expect(createGenerationSpy).toHaveBeenCalledTimes(2);
  });

  test('Should get next generation', () => {
    const { getByTestId } = render(<App/>);

    act(()=> {
      fireEvent.click(getByTestId('next'))
    })

    expect(getNextGenerationSpy).toHaveBeenCalledTimes(1);
  });
})

