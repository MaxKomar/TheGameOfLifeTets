//@flow

import React from 'react'
import styled from 'styled-components';

type Props = {
  isLive: boolean
};

const CellComponent = styled.div.attrs(() => ({
  "data-testid": "cell"
}))`
  width: 8px;
  height: 8px;
  border: 1px solid;
  display: inline-block;
  margin: 1px;
  background: ${({ isLive }: Props) => isLive ? 'black' : 'white'};
`;

export const Cell = React.memo<Props>(CellComponent);