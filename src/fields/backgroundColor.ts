import { Field } from 'payload'

export type Type = 'black' | 'purple' | 'none' | 'gold' | 'white'

const backgroundColor: Field = {
  name: 'backgroundColor',
  type: 'radio',
  label: 'Background Color',
  defaultValue: 'none',
  admin: {
    layout: 'horizontal',
  },
  options: [
    {
      label: 'None',
      value: 'none',
    },
    {
      label: 'Gold',
      value: 'gold',
    },
    {
      label: 'Purple',
      value: 'purple',
    },
    {
      label: 'Black',
      value: 'black',
    },
  ],
}

export default backgroundColor
