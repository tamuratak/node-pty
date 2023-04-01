var pty = require('../..');

var ptyProcess = pty.spawn('cat', [], {
  name: 'cat',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});


ptyProcess.onData((data) => {
  console.log(JSON.stringify(data));
});


ptyProcess.onExit((ev) => {
    console.log(`pty exited with ${ev.exitCode}`);
});

ptyProcess.write('cat\n');
ptyProcess.write('aaa\n');
setTimeout(() => {
  ptyProcess.write('\x03');
}, 1000)

process.on('exit', () => {
  console.log('exiiiiiit');
})
