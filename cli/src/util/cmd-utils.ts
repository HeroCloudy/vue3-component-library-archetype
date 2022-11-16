import shelljs from 'shelljs'
import { closeLoading } from './loading-utils'

export const execCmd = (cmd: string) => new Promise((resolve, reject) => {
  shelljs.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      closeLoading()
      reject(new Error(stderr))
    }
    return resolve('')
  })
})
