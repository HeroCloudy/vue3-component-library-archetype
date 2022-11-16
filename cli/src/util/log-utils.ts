import chalk from 'chalk'
import logSymbols from 'log-symbols'

export const r = (msg: string, showIcon = true): void => {
  if (showIcon) {
    console.log(logSymbols.error, chalk.red(msg))
  } else {
    console.log(chalk.red(msg))
  }
}

export const g = (msg: string, showIcon = true): void => {
  if (showIcon) {
    console.log(logSymbols.success, chalk.green(msg))
  } else {
    console.log(chalk.green(msg))
  }
}

export const c = (msg: string): void => {
  console.log(logSymbols.info, chalk.cyan(msg))
}
