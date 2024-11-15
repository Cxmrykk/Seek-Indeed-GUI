const ChildProcess = require('child_process')
const path = require('path')

function loadChromeDriver(execPath, args) {
  const command = path.join(execPath);
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
  }

  const chromeDriverProcess = ChildProcess.spawn(command, args, options);

  chromeDriverProcess.on('close', code => {
    if (code !== null && code !== 0) {
      console.error(`Chromedriver exited with error code: ${code}`)
    }
  });

  chromeDriverProcess.on('error', error => {
    console.error(error)
  });

  const killChromeDriver = () => {
    try {
      chromeDriverProcess.kill()
    } catch (ignored) {}
  }

  process.on('exit', killChromeDriver)
  process.on('SIGTERM', killChromeDriver)
}

module.exports = {
  loadChromeDriver
};
