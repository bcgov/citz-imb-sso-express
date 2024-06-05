const fs = require('fs');
const path = require('path');

// Define the paths
const declarationFilePath = path.join('build', 'bundle.d.ts');
const docsDirectoryPath = path.join('techdocs', 'docs');

// Read the declaration file
fs.readFile(declarationFilePath, 'utf8', (error, declarationData) => {
  if (error) {
    console.error('Error reading the declaration file:', error);
    return;
  }

  // Remove export lines
  const filteredDeclarationData = declarationData
    .split('\n')
    .filter((line) => !line.startsWith('export '))
    .join('\n');

  // Extract types from the filtered declaration file
  const typeDefinitions = extractTypeDefinitions(filteredDeclarationData);

  // Recursively process markdown files
  processMarkdownFiles(docsDirectoryPath, typeDefinitions);
});

// Extract type definitions from the declaration file
const extractTypeDefinitions = (declarationData) => {
  const typeRegex = /(?:type|interface|const|let|var|function|class)\s+(\w+(\.\w+)?)[\s\S]*?[;{]/g;
  const types = {};
  let match;

  while ((match = typeRegex.exec(declarationData)) !== null) {
    const typeName = match[1];
    const startIndex = match.index;
    const endIndex = findTypeEnd(declarationData, startIndex + match[0].length - 1);
    const typeDefinition = declarationData.slice(startIndex, endIndex + 1).trim();
    types[typeName] = typeDefinition;
  }

  return types;
};

// Find the end of the type definition, handling nested braces
const findTypeEnd = (str, index) => {
  let stack = [];
  for (let i = index; i < str.length; i++) {
    if (str[i] === '{') {
      stack.push('{');
    } else if (str[i] === '}') {
      stack.pop();
      if (stack.length === 0) {
        return i;
      }
    } else if (str[i] === ';' && stack.length === 0) {
      return i;
    }
  }
  return str.length - 1;
};

// Recursively process markdown files in a directory
const processMarkdownFiles = (directory, typeDefinitions) => {
  fs.readdir(directory, (error, files) => {
    if (error) {
      console.error('Error reading directory:', error);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error('Error stating file:', error);
          return;
        }

        if (stat.isDirectory()) {
          processMarkdownFiles(filePath, typeDefinitions);
        } else if (stat.isFile() && filePath.endsWith('.md')) {
          processMarkdownFile(filePath, typeDefinitions);
        }
      });
    });
  });
};

// Process a single markdown file
const processMarkdownFile = (filePath, typeDefinitions) => {
  fs.readFile(filePath, 'utf8', (error, markdownData) => {
    if (error) {
      console.error('Error reading markdown file:', error);
      return;
    }

    // Find and replace TYPE comments and their corresponding code blocks
    const updatedMarkdownData = replaceTypeCodeBlocks(markdownData, typeDefinitions);

    // Write the updated content back to the markdown file if changes were made
    if (updatedMarkdownData !== markdownData) {
      fs.writeFile(filePath, updatedMarkdownData, 'utf8', (error) => {
        if (error) {
          console.error('Error writing updated markdown file:', error);
          return;
        }

        console.log(`Successfully updated the TypeScript code blocks in ${filePath}`);
      });
    }
  });
};

// Replace TYPE comments and their corresponding code blocks in markdown data
const replaceTypeCodeBlocks = (markdownData, typeDefinitions) => {
  const typeCommentRegex = /<!-- TYPE:\s*(\w+(\.\w+)?)\s*-->/g;
  let match;

  while ((match = typeCommentRegex.exec(markdownData)) !== null) {
    const typeName = match[1];
    const typeParts = typeName.split('.');
    const baseTypeName = typeParts[0];
    const typeDefinition = typeDefinitions[baseTypeName];

    if (typeDefinition) {
      let specificTypeDefinition = typeDefinition;
      if (typeParts.length > 1) {
        specificTypeDefinition = getNestedTypeDefinition(typeDefinition, typeParts.slice(1));
      }

      const codeBlockStart = markdownData.indexOf('```TypeScript', match.index);
      const codeBlockEnd = markdownData.indexOf('```', codeBlockStart + '```TypeScript\n'.length);

      if (codeBlockStart !== -1 && codeBlockEnd !== -1) {
        const beforeCodeBlock = markdownData.slice(0, codeBlockStart + '```TypeScript\n'.length);
        const afterCodeBlock = markdownData.slice(codeBlockEnd);
        markdownData = beforeCodeBlock + specificTypeDefinition + '\n' + afterCodeBlock;
      }
    }
  }

  return markdownData;
};

// Extract nested type definition
const getNestedTypeDefinition = (typeDefinition, typeParts) => {
  const typeLines = typeDefinition.split('\n');
  let nestedTypeDefinition = '';
  let capture = false;
  let braceStack = 0;
  const regex = new RegExp(`^\\s*${typeParts.join('\\.')}:\\s*(.*?)(;|{)`);
  for (const line of typeLines) {
    if (capture) {
      nestedTypeDefinition += line + '\n';
      braceStack += (line.match(/{/g) || []).length;
      braceStack -= (line.match(/}/g) || []).length;
      if (braceStack === 0) {
        break;
      }
    } else if (regex.test(line)) {
      nestedTypeDefinition = line.trim() + '\n';
      capture = true;
      braceStack += (line.match(/{/g) || []).length;
      braceStack -= (line.match(/}/g) || []).length;
      if (braceStack === 0 && line.trim().endsWith(';')) {
        break;
      }
    }
  }

  return nestedTypeDefinition.trim();
};
