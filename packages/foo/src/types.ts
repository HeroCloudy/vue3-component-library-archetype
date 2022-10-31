import { ExtractPropTypes } from 'vue'

export const fooProps = {
  msg: {
    type: String,
    required: false,
    default: ''
  }
}

export type FooProps = ExtractPropTypes<typeof fooProps>
