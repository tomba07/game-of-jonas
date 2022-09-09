/*
 * This strategy thinks in columns. 
 * The idea is to fill the first column randomly.
 * Beginning with the second column, it always paints a black square if possible.
 * TODO: Not sure, if this always returns valid results. This has to be tested.
 */

//todo: implement resetHook

let rowIndex = 0,
    columnIndex = 0,
    isFirstColumn = true;

function randomColumnStrategy() {
    setCurrentField();

    updateIndexes();
}

function setCurrentField() {
    tableArr[rowIndex][columnIndex] = Math.round(Math.random());
}

function updateIndexes() {
    columnIndex++;
    
    //update
    if (columnIndex >= gridLn) {
        rowIndex++;
        
        if (rowIndex >= gridLn) {
            rowIndex = 0;
            stop()
        }
        columnIndex = 0;
    }
}