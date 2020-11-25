import FloatPanel from '.'

import React from 'react'
import { render } from '@testing-library/react'

describe('ExampleComponent', () => {
  test('is truthy', () => {
    const wrapper = render(
      <FloatPanel pos={{ x: 0, y: 0, width: 200, height: 500 }} minWidth={80}>
        test
      </FloatPanel>
    )
    // expect(FloatPanel).toBeTruthy()
    expect(wrapper.container.innerHTML).toContain('test')
  })
})
