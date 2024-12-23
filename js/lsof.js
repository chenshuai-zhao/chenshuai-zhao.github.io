const { spawn } = require('child_process');

// 使用spawn执行命令
const lsof = spawn('lsof', ['-i', ':6379']);

lsof.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

lsof.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

lsof.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
});