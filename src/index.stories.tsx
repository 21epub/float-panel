import React, { useState } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import FloatPanel, { CompProps } from '.'

export default {
  title: 'FloatPanel',
  component: FloatPanel,
  argTypes: {
    children: {
      type: { name: 'string', required: true },
      description: 'content info'
    }
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    )
  ]
} as Meta

const Template: Story<CompProps> = (args: CompProps) => <FloatPanel {...args} />

export const Primary = Template.bind({})
Primary.args = {
  disableDragging: true,
  children: 'This is a demo example',
  className: 'Demo',
  enableResizing: true,
  minWidth: 200,
  pos: { x: 0, y: 0, width: 320, height: 200 },
  style: {
    pointerEvents: 'initial'
  },
  titleHeight: 22,
  title: 'Test',
  titleBarStyle: {
    height: 22
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
  ...Primary.args,
  enableClose: true,
  children: 'This is a closable panel'
}

export const AutoHeight = TemplateClose.bind({})
AutoHeight.args = {
  ...Primary.args,
  enableClose: false,
  children:
    'This is a autoheight panel , drag it down to see that this window content will auto scroll to fit',
  pos: { x: 0, y: 0, height: 'auto', width: 200 },
  disableDragging: false
}

export const Demo = (args: CompProps) => <FloatPanel {...args} />
