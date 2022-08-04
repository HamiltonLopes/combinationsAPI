import { App } from './app.js';
import process from 'process'

( async () => {
  const ExitStatus = { Failure: 1, Success: 0 }
  try{
    /*
      INIT AND RUN SERVER
    */
    const server = new App()
    await server.init()
    server.start()

    /*
      GRACEFUL SHUTDOWN
    */

    const exitSignals = ['SIGNINT', 'SIGNTEM', 'SIGQUIT']
      exitSignals.map( sign => {
        process.on( sign, async () => {
          try {
            console.log("✅ [TRAVELLOG-🐘] App exit with success...Bye!👋🤓")
            process.exit(ExitStatus.Success)
          } catch (error) {
            console.log("App exit with error: " + error)
            process.exit(ExitStatus.Failure)
          }
        })
      })
  } catch (error) {
    console.log(`App exit with error: ${error}`)
    process.exit(ExitStatus.Failure)
  }
})();
