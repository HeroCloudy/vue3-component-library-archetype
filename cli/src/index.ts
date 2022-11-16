import { program } from 'commander'
import { createComponent } from './command/create-component'
import { c } from './util/log-utils'

export const mainEntry = () => {
  c('yyg-demo-ui cli 工具')

  program.version(require('../package').version)
    .usage('<command> [arguments]')

  program.command('create')
    .description('create a new component')
    .alias('c')
    .action(createComponent)

  program.parse(process.argv)

  if (!program.args.length) {
    program.help()
  }
}
