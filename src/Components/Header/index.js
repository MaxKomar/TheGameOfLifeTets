//@flow
import React from 'react';
import styled from 'styled-components';

type HeaderProps = {
  isSimulationRunning: boolean;
  onToggleSimulationRun: ()=>void;
  onReset: ()=>void;
  onNextTick: ()=>void;
}

const Button = styled.button`
  padding: 8px;
  cursor: pointer;
  margin-right: 8px;
  
  &:last-child {
    margin-right: 0;
  }
`
const HeaderWrapper = styled.header`
  padding: 8px;
  text-align: center;
`;

export const Header = (props: HeaderProps) => {
  return <HeaderWrapper>
    {!props.isSimulationRunning && <>
      <Button data-testid="run" onClick={props.onToggleSimulationRun}>Run simulation</Button>
      <Button data-testid="next" onClick={props.onNextTick}>Next tick</Button>
    </>}
    {props.isSimulationRunning && <Button data-testid="pause" onClick={props.onToggleSimulationRun}>Pause simulation</Button>}
    <Button data-testid="reset" onClick={props.onReset}>Reset simulation</Button>
  </HeaderWrapper>
}