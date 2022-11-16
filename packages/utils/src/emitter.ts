import mitt from 'mitt'
const Mitt = mitt
export const emitter: mitt.Emitter = new Mitt()

export default emitter
