import React from 'react';
import { render } from '@testing-library/react';
import {Cell} from "./index";

describe('Cell component test', ()=> {

  test('cell should have white background', () => {
    const {getByTestId} = render(<Cell isLive={false}/>);

    expect(getByTestId('cell')).toHaveStyle('background: white')
  })

  test('cell should have black background', () => {
    const {getByTestId} = render(<Cell isLive={true}/>);

    expect(getByTestId('cell')).toHaveStyle('background: black')
  })
})