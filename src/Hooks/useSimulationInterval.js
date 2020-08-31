//@flow

import { useEffect, useRef } from 'react';

export default function useSimulationInterval(callback: () => void, isRunning: boolean) {
  const savedCallback = useRef<()=>void>(()=>{});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (isRunning) {
      let id = setInterval(tick, 300);
      return () => clearInterval(id);
    }
  }, [isRunning]);
}