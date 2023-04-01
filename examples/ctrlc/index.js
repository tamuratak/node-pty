var pty = require('../..');

var ptyProcess = pty.spawn('zsh', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});


ptyProcess.onData((data) => {
  console.log(JSON.stringify(data));
//  process.stdout.write(data);
//  console.log(data);
//  process.exit(0);
});


ptyProcess.onExit((ev) => {
    console.log(`pty exited with ${ev.exitCode}`);
});

ptyProcess.write('\x03');
ptyProcess.write('\n');
ptyProcess.write('\x03');

process.on('exit', () => {
  console.log('exiiiiiit');
  process.kill(ptyProcess.pid, 'SIGHUP');
})
