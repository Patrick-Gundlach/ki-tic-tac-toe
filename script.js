let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle';

function init(){
    render();
}

function render() {
    const container = document.getElementById('content');
    let tableHTML = '<table>';
    let row = 0;
    for (let i = 0; i < 9; i++) {
      if (i % 3 === 0) {
        tableHTML += '<tr>';
      }

      let cellContent = '';
      if (fields[i] === 'circle') {
        cellContent = generateCircleSVG();
      } else if (fields[i] === 'cross') {
        cellContent = generateCrossSVG();
      }

      tableHTML += `<td onclick="onCellClick(${i})">${cellContent}</td>`;

      if ((i + 1) % 3 === 0) {
        tableHTML += '</tr>';
      }
    }
    tableHTML += '</table>';
    container.innerHTML = tableHTML;
  }

  function generateCircleSVG() {
    const width = 50;
    const height = 50;
    const color = '#02AAE7';
    const percentage = 70;

    const radius = (width - 10) / 2; // Berücksichtige die Strichstärke
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);

    const svgCode = `
      <svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="none" stroke="${color}" stroke-width="5">
          <animate attributeName="stroke-dasharray" from="0 ${circumference}" to="${circumference} 0" dur="1s" fill="freeze" />
          <animate attributeName="stroke-dashoffset" from="${circumference}" to="${offset}" dur="750ms" fill="freeze" />
        </circle>
      </svg>
    `;

    return svgCode;
  }

  function generateCrossSVG() {
    const width = 50;
    const height = 50;
    const color = '#FFC000';
    const strokeWidth = 15;

    const svgCode = `
      <svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="${height}" x2="${width}" y2="0" stroke="${color}" stroke-width="${strokeWidth}">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="45 ${width / 2} ${height / 2}" to="0 ${width / 2} ${height / 2}" dur="500ms" fill="freeze" />
        </line>
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="${strokeWidth}">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-45 ${width / 2} ${height / 2}" to="0 ${width / 2} ${height / 2}" dur="750ms" fill="freeze" />
        </line>
      </svg>
    `;

    return svgCode;
  }

  function onCellClick(index) {
    if (fields[index] === null) {
      fields[index] = currentPlayer;
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
      const cell = document.getElementsByTagName('td')[index];
      cell.innerHTML = fields[index] === 'circle' ? generateCircleSVG() : generateCrossSVG();
    }
  }