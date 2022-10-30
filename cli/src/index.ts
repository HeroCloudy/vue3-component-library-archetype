import { program } from 'commander'
import { g } from './util/log-utils'
import { createComponent } from './command/create-component'

export const mainEntry = () => {
  g('hello cli! made by 程序员优雅哥', false)

  program.version(require('../package').version)
    .usage('<command> [arguments]')

  program.command('create')
    .description('create a new component')
    .alias('c')
    .action(() => {
      createComponent()
    })

  program.parse(process.argv)

  if (!program.args.length) {
    program.help()
  }
}
