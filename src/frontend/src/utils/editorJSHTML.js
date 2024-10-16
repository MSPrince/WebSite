// src/utils/editorJSHTML.js
import EditorJSHTML from "editorjs-html";

// Define the custom parser for the "table" block
// src/utils/editorJSHTML.js
const tableParser = (block) => {
  const { content } = block.data;
  let tableHTML = '<table class="prose-table border-collapse border border-gray-300">';

  content.forEach((row) => {
    tableHTML += '<tr>';
    row.forEach((cell) => {
      tableHTML += `<td class="border text-sm border-gray-300 p-1">${cell}</td>`;
    });
    tableHTML += '</tr>';
  });

  tableHTML += '</table>';
  return tableHTML;
};


// Initialize editorjs-html with the custom table parser
const editorJSHTML = EditorJSHTML({
  table: tableParser, // Add custom parser for table blocks
});

export default editorJSHTML;
