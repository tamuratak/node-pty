var pty = require('../..');

var ptyProcess = pty.spawn('zsh', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});


ptyProcess.onData((data) => {
  process.stdout.write(data);
  process.exit(0);
});


ptyProcess.onExit((ev) => {
    console.log(`pty exited with ${ev.exitCode}`);
});

ptyProcess.write('ls\n');

process.on('exit', () => {
  console.log('exiiiiiit');
  process.kill(ptyProcess.pid, 'SIGHUP');
})
