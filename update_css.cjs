const fs = require('fs');
const path = require('path');
const dir = './src/css';
const files = fs.readdirSync(dir);

const regex = /background:\s+var\(--aero-glass-bg\);\n\s+backdrop-filter:\s+var\(--aero-blur\);\n\s+-webkit-backdrop-filter:\s+var\(--aero-blur\);\n\s+border:\s+1px\s+solid\s+var\(--aero-glass-border\);\n\s+border-radius:\s+var\(--aero-radius\);\n\s+box-shadow:\s+var\(--aero-shadow\);/g;

const newBlock = `background: var(--aero-glass-bg-strong);
    backdrop-filter: var(--aero-blur-heavy);
    -webkit-backdrop-filter: var(--aero-blur-heavy);
    border: 1px solid rgba(0, 5, 10, 0.6);
    border-radius: var(--aero-radius);
    box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.85),
        inset 1px 0 0 rgba(255, 255, 255, 0.4),
        inset -1px 0 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(255, 255, 255, 0.3),
        inset 0 25px 40px rgba(255, 255, 255, 0.15),
        var(--aero-shadow);`;

let count = 0;
files.forEach(file => {
  if (file.endsWith('.css') && file !== 'OpenProject.css') {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (regex.test(content)) {
      content = content.replace(regex, newBlock);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated window frame in', file);
      count++;
    }
  }
});
console.log('Total files updated:', count);
