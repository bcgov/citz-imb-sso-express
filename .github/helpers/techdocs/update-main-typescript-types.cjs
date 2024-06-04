const fs = require('fs');
const path = require('path');

// Define the paths to the files
const declarationFilePath = path.join('build', 'bundle.d.ts');
const markdownFilePath = path.join('techdocs', 'docs', 'using-the-package', 'typescript-types.md');

// Read the declaration file
fs.readFile(declarationFilePath, 'utf8', (error, declarationData) => {
  if (error) {
    console.error('Error reading the declaration file:', error);
    return;
  }

  // Read the markdown file
  fs.readFile(markdownFilePath, 'utf8', (error, markdownData) => {
    if (error) {
      console.error('Error reading the markdown file:', error);
      return;
    }

    // Find the comment <!-- TYPESCRIPT TYPES -->
    const tsTypesCommentIndex = markdownData.indexOf('<!-- TYPESCRIPT TYPES -->');
    if (tsTypesCommentIndex === -1) {
      console.error('<!-- TYPESCRIPT TYPES --> comment not found in the markdown file.');
      return;
    }

    // Find the TypeScript code block right after the <!-- TYPESCRIPT TYPES --> comment
    const tsCodeBlockStart = markdownData.indexOf('```TypeScript', tsTypesCommentIndex);
    const tsCodeBlockEnd = markdownData.indexOf('```', tsCodeBlockStart + 1);

    if (tsCodeBlockStart === -1 || tsCodeBlockEnd === -1) {
      console.error('TypeScript code block not found after <!-- TYPESCRIPT TYPES --> comment.');
      return;
    }

    // Replace the TypeScript code block with the contents of the declaration file
    const updatedMarkdownData =
      markdownData.slice(0, tsCodeBlockStart + '```TypeScript\n'.length) +
      declarationData +
      markdownData.slice(tsCodeBlockEnd);

    // Write the updated content back to the markdown file
    fs.writeFile(markdownFilePath, updatedMarkdownData, 'utf8', (error) => {
      if (error) {
        console.error('Error writing the updated markdown file:', error);
        return;
      }

      console.log('Successfully updated the TypeScript code block in the markdown file.');
    });
  });
});
