import { exec } from 'child_process';

const runCoverageAndOpenReport = () => {
  console.log('Running test coverage...');

  // Run test coverage
  exec('jest --coverage', (error, stdout, stderr) => {
    console.log(stdout);
    if (error) {
      console.error(`Jest exited with errors: ${stderr}`);
    } else {
      console.error(`Jest executed successfully: ${stderr}`);
    }

    // Determine the command based on the OS
    const platform = process.platform;
    let openCommand;

    if (platform === 'win32') {
      // Windows
      openCommand = 'start';
    } else if (platform === 'darwin') {
      // macOS
      openCommand = 'open';
    } else {
      // Linux and others
      openCommand = 'xdg-open';
    }

    // Execute the appropriate command to open the file
    exec(`${openCommand} ./coverage/lcov-report/index.html`, (openError) => {
      if (openError) {
        console.error(`Failed to open the coverage report: ${openError}`);
        return;
      }
      console.log('Coverage report opened successfully.');
    });
  });
};

runCoverageAndOpenReport();
