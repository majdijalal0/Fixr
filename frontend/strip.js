const fs = require('fs');
const path = require('path');

function stripComments(code) {
  let inString = false;
  let stringChar = null;
  let inSingleLineComment = false;
  let inMultiLineComment = false;
  let escape = false;
  let result = '';

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const nextChar = code[i + 1];

    if (inSingleLineComment) {
      if (char === '\n' || char === '\r') {
        inSingleLineComment = false;
        result += char;
      }
      continue;
    }

    if (inMultiLineComment) {
      if (char === '*' && nextChar === '/') {
        inMultiLineComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      result += char;
      if (escape) {
        escape = false;
      } else if (char === '\\') {
        escape = true;
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    if (char === '/' && nextChar === '/') {
      inSingleLineComment = true;
      i++;
      continue;
    }

    if (char === '/' && nextChar === '*') {
      inMultiLineComment = true;
      i++;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      escape = false;
      result += char;
      continue;
    }

    result += char;
  }

  return result;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      const code = fs.readFileSync(filePath, 'utf8');
      const stripped = stripComments(code);
      if (code !== stripped) {
        fs.writeFileSync(filePath, stripped, 'utf8');
        console.log(`Stripped comments from: ${filePath}`);
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');
if (fs.existsSync(srcDir)) {
  processDirectory(srcDir);
} else {
  console.log('src directory not found in ' + __dirname);
}
