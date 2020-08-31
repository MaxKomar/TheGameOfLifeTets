import { renderHook, cleanup } from '@testing-library/react-hooks';
import useSimulationInterval from './useSimulationInterval'
jest.useFakeTimers();

describe('UseSimulationInterval test', () => {
  const callbackMock = jest.fn();

  afterEach(() => {
    callbackMock.mockReset();
    cleanup();
  })

  test('is passed a `handler` and a `isRunning`', () => {
    renderHook(() => {
      useSimulationInterval(callbackMock, true);
    });

    expect(callbackMock).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(600);
    expect(callbackMock).toHaveBeenCalledTimes(2);
  });

  test('stops interval after change `isRunning`', () => {
    let initialValue = true;
    const {rerender} = renderHook(() => {
      useSimulationInterval(callbackMock, initialValue);
    });

    expect(callbackMock).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(600);

    initialValue = false;
    rerender();
    jest.advanceTimersByTime(600)

    expect(callbackMock).toHaveBeenCalledTimes(2);
  });

  test('stops interval after unmount', () => {
    const {unmount} = renderHook(() => {
      useSimulationInterval(callbackMock, true);
    });

    expect(callbackMock).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(600);

    unmount();
    jest.advanceTimersByTime(600)

    expect(callbackMock).toHaveBeenCalledTimes(2);
  });
})