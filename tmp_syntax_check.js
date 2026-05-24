const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'app', 'admin', 'dashboard', 'page.tsx');
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
for (let i = 1038; i <= 1065; i++) {
  console.log(`${i}: ${lines[i-1]}`);
}
