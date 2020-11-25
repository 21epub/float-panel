import React, { useState } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import FloatPanel, { CompProps } from '.'

export default {
  title: 'FloatPanel',
  component: FloatPanel,
  argTypes: {
    default: {
      children: 'Create React TS Parcel Library Example in storybook 😄',
      pos: { x: 0, y: 0, width: 320, height: 200 }
    }
  }
} as Meta

const Template: Story<CompProps> = (args: CompProps) => <FloatPanel {...args} />

export const Primary = Template.bind({})
Primary.args = {
  disableDragging: true,
  children: 'This is a example',
  className: 'Demo',
  enableResizing: true,
  minWidth: 200,
  pos: { x: 0, y: 0, width: 320, height: 200 },
  style: {
    pointerEvents: 'initial'
  }
}

const TemplateClose: Story<CompProps> = (args: CompProps) => {
  const [close, setClose] = useState(false)
  const onClose = () => {
    setClose(true)
  }
  const params = { ...args, onClose }
  return <>{!close ? <FloatPanel {...params} /> : <div />}</>
}

export const Closable = TemplateClose.bind({})
Closable.args = {
  enableClose: true,
  children: 'This is a closable panel'
}
