/*
 * This strategy thinks in columns.
 * The idea is to fill the first column randomly.
 * Beginning with the second column, it always paints a black square if possible.
 * TODO: Not sure, if this always returns valid results. This has to be tested.
 */

class RandomColumnStrategy extends BaseStrategy{
  #rowIndex = 0;
  #columnIndex = 0;
  #isFirstColumn = true;

  execute(tableArr) {
    this.#setCurrentField(tableArr);

    this.#updateIndexes(tableArr.length);

    return tableArr;
  }

  reset() {
    this.#rowIndex = 0;
    this.#columnIndex = 0;
    this.#isFirstColumn = true;
  }

  #setCurrentField(tableArr) {
    tableArr[this.#rowIndex][this.#columnIndex] = this.#getFieldValue(tableArr);
  }

  #getFieldValue(tableArr) {
    let value;

    if (this.#isFirstColumn) {
      value = Math.round(Math.random());
    } else {
      value = this.#isFieldAllowed(tableArr) ? 1 : 0;
    }

    return value;
  }

  #isFieldAllowed(tableArr) {
    const rowIndex = this.#rowIndex,
      columnIndex = this.#columnIndex;

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

  #updateIndexes(tableSize) {
    this.#columnIndex++;

    //update
    if (this.#columnIndex >= tableSize) {
      this.#rowIndex++;

      if (this.#rowIndex >= tableSize) {
        this.#rowIndex = 0;
        stop();
      }
      this.#isFirstColumn = false;
      this.#columnIndex = 0;
    }
  }
}
