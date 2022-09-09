/*
 * This strategy thinks in columns. 
 * The idea is to fill the first column randomly.
 * Beginning with the second column, it always paints a black square if possible.
 * TODO: Not sure, if this always returns valid results. This has to be tested.
 */

let rowIndex = 0,
    columnIndex = 0,
    isFirstColumn = true;

function randomColumnStrategy() {
    setCurrentField();

    updateIndexes();
}

function resetRandomColumnStrategy() {
    rowIndex = 0;
    columnIndex = 0;
    isFirstColumn = true;
}

function setCurrentField() {
    tableArr[rowIndex][columnIndex] = getFieldValue();
}

function getFieldValue() {
    let value;

    if (isFirstColumn) {
        value = Math.round(Math.random())
    }else {
        value = isFieldAllowed() ? 1 : 0;
    }

    return value;
}

function isFieldAllowed() {
    let allowed = true;
    
    //always allowed in first row and column
    if (rowIndex > 0 && columnIndex > 0) {
        const field1Filled = tableArr[rowIndex - 1][columnIndex - 1] === 1,
            field2Filled = tableArr[rowIndex - 1][columnIndex] === 1,
            field3Filled = tableArr[rowIndex][columnIndex - 1] === 1;
        
        //if all three neighbors already filled, we can't fill this guy...
        allowed = !(field1Filled && field2Filled && field3Filled);
    }

    return allowed;
}

function updateIndexes() {
    columnIndex++;
    
    //update
    if (columnIndex >= gridLn) {
        rowIndex++;
        
        if (rowIndex >= gridLn) {
            rowIndex = 0;
            stop();
        }
        isFirstColumn = false;
        columnIndex = 0;
    }
}