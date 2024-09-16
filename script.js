// script.js
document.getElementById('generate').addEventListener('click', () => {
    const numRows = parseInt(document.getElementById('numRows').value);
    if (isNaN(numRows) || numRows < 1 || numRows > 30) {
        alert('Please enter a number between 1 and 30.');
        return;
    }
    generatePascalsTriangle(numRows);
});

function generatePascalsTriangle(numRows) {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';

    const result = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                row.push(1);
            } else {
                row.push(result[i - 1][j - 1] + result[i - 1][j]);
            }
        }
        result.push(row);
        createRowVisualization(row, i);
    }
    showCodeExplanation();
}

function createRowVisualization(row, rowIndex) {
    const visualization = document.getElementById('visualization');
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    row.forEach((value) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell enter';
        cellDiv.textContent = value;
        rowDiv.appendChild(cellDiv);
    });
    visualization.appendChild(rowDiv);

    // Animate
    const cells = rowDiv.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('enter-active');
        }, index * 500); // Staggered animation
    });
}

function showCodeExplanation() {
    const codeDiv = document.getElementById('code');
    codeDiv.innerHTML = `
        <h3>Java Code Explanation:</h3>
        <pre>
<code>
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> result = new ArrayList<>();
        // Initialize result list to hold rows

        for(int i = 0; i<numRows; i++){
            List<Integer> row = new ArrayList<>();
            // Create a new row

            for(int j = 0; j<=i; j++){
                if(j==0 || j==i){
                    row.add(1);
                    // Add 1 to the start or end of the row
                }
                else{
                    List<Integer> prevRow = result.get(i-1);
                    row.add(prevRow.get(j-1) + prevRow.get(j));
                    // Calculate the value based on the previous row
                }
            }
            result.add(row);
            // Add the row to the result
        }
        return result;
        // Return the completed triangle
    }
}
</code>
        </pre>
        <p>Explanation:</p>
        <ul>
            <li><code>List<List<Integer>> result = new ArrayList<>();</code> initializes the result list to hold the rows of Pascal's Triangle.</li>
            <li>The outer loop iterates over each row.</li>
            <li>The inner loop calculates each value in the row. It uses values from the previous row to compute the new values.</li>
            <li><code>result.add(row);</code> adds the completed row to the result.</li>
        </ul>
    `;
}