const { execSync } = require('child_process');

command = `npx playwright codegen`
try {
    console.log(command);
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    console.error('Error:', error);
}