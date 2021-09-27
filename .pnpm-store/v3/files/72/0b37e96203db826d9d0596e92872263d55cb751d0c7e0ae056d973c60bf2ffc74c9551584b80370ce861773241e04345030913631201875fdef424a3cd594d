type Color =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'

type StopAndPrintOptions = {
  color: Color
  symbol: string
}

interface Options {
  /**
  Stream to write the output.
  You could for example set this to `process.stdout` instead.
  @default process.stderr
  */
  stream?: NodeJS.WriteStream
}

interface Spinner {
  /**
  Text to display after the spinner.
  */
  readonly text: string

  /**
  Stop the spinner, change it to a red `✖`
  @returns The spinner instance.
  */
  fail(): Spinner

  /**
  Stop the spinner, change it to a green `✔`
  @returns The spinner instance.
  */
  succeed(): Spinner

  /**
  Start the spinner.
  @returns The spinner instance.
  */
  start(): Spinner

  /**
  Stop and clear the spinner.
  @returns The spinner instance.
  */
  stop(): Spinner

  /**
  Stop the spinner and change the symbol or text.
  @returns The spinner instance.
  */
  stopAndPrint(opts: StopAndPrintOptions): Spinner
}

/**
Minimalistic spinner for Node.js

@param textStr - The promise to start the spinner for.
@param opts - The options for the spinner.

@example
  ```
    let micoSpinner = require('mico-spinner')

    let spinner = micoSpinner('Long task').start()
    try {
      await longTask()
      spinner.succeed()
    } catch (e) {
      spinner.fail()
      console.error(e.stack)
    }
  ```

@returns The spinner instance.
*/
declare function MicoSpinner(textStr: string, opts?: Options): Spinner

export = MicoSpinner
