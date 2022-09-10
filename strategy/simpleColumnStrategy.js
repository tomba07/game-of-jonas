/*
 * This strategy thinks in columns.
 * The idea is to fill the first column randomly.
 * Then, beginning with the second column, it always paints a black square if possible.
 * It does seem to generate valid patterns - they do however look pretty boring...
 */

class SimpleColumnStrategy extends BaseStrategy{
  #rowIndex = 0;
  #columnIndex = 0;
  #isFirstColumn = true;

  execute(field, fnCompleted) {
    this.#setCurrentCell(field);
    this.#updateIndexes(field.length, fnCompleted);

    return field;
  }

  reset() {
    this.#rowIndex = 0;
    this.#columnIndex = 0;
    this.#isFirstColumn = true;
  }

  #setCurrentCell(field) {
    field[this.#rowIndex][this.#columnIndex] = this.#getCellValue(field);
  }

  #getCellValue(field) {
    let value;

    if (this.#isFirstColumn) {
      value = Math.round(Math.random());
    } else {
      value = this.#isCellAllowed(field) ? 1 : 0;
    }

    return value;
  }

  #isCellAllowed(field) {
    const rowIndex = this.#rowIndex,
      columnIndex = this.#columnIndex;

    let allowed = true;

    //always allowed in first row and column
    if (rowIndex > 0 && columnIndex > 0) {
      const cell1Filled = field[rowIndex - 1][columnIndex - 1] === 1,
        cell2Filled = field[rowIndex - 1][columnIndex] === 1,
        cell3Filled = field[rowIndex][columnIndex - 1] === 1;

      //if all three neighbors already filled, we can't fill this guy...
      allowed = !(cell1Filled && cell2Filled && cell3Filled);
    }

    return allowed;
  }

  #updateIndexes(fieldSize, fnCompleted) {
    this.#columnIndex++;

    if (this.#columnIndex >= fieldSize) {
      this.#rowIndex++;

      if (this.#rowIndex >= fieldSize) {
        this.#rowIndex = 0;
        fnCompleted();
      }
      this.#isFirstColumn = false;
      this.#columnIndex = 0;
    }
  }
}
