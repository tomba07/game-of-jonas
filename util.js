function initTable() {
    tableArr = [];

    for (let r = 0; r < gridLn; r++) {
        let rowArr = [];
        for (let c = 0; c < gridLn; c++) {
            rowArr.push(0);
        }
        tableArr.push(rowArr);
    }
}

function drawRect(val, row, col) {
    fill(val === 1 ? "black" : "transparent"); // Black if live, transparent if dead
    rect(row * boxWid, col * boxWid, boxWid, boxWid);
}

function setFPS(newFps) {
    fps = newFps;
    frameRate(newFps);
}

function stop() {
    state = 2;
    button.html('Reset');
}