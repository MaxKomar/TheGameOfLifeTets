//@flow

import React from 'react';
import styled from 'styled-components'
import {Cell} from "../";
import type {Generation} from "../../Services/Simulation";

type Props = {
  generation: Generation
}

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const GridComponent = ({ generation }: Props) => {
  return <section>
    {generation.map((row, rowIndex) => {
      return <Row key={rowIndex}>
        {row.map((cellStatus, cellIndex) => <Cell isLive={cellStatus} key={cellIndex}/>)}
      </Row>
    })}
  </section>
}

export const Grid = React.memo<Props>(GridComponent);