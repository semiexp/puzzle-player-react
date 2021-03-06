export default class LineGrid {
    constructor(height, width) {
        this._height = height;
        this._width = width;
        this._data = new Array(height * 2 - 1);

        for (let y = 0; y < height * 2 - 1; ++y) {
            this._data[y] = new Array(width * 2 - 1).fill(LineGrid.UNDECIDED);
        }

        this._undoHistory = [];
        this._redoHistory = [];
    }

    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    getSegment(x, y) {
        if (0 <= x && x < this.width * 2 - 1 && 0 <= y && y < this.height * 2 - 1) {
            return this._data[y][x];
        } else {
            return LineGrid.BLANK;
        }
    }
    setSegment(x, y, s, updateHistory = true) {
        if (updateHistory) {
            this._redoHistory = [];
            this._undoHistory.push({ x, y, state: this._data[y][x] });
        }
        this._data[y][x] = s;
        return this;
    }

    undo() {
        if (this._undoHistory.length == 0) return this;

        const { x, y, state } = this._undoHistory.pop();
        this._redoHistory.push({ x, y, state: this._data[y][x] });
        this._data[y][x] = state;
        return this;
    }
    redo() {
        if (this._redoHistory.length == 0) return this;

        const { x, y, state } = this._redoHistory.pop();
        this._undoHistory.push({ x, y, state: this._data[y][x] });
        this._data[y][x] = state;
        return this;
    }
    undoAll() {
        while (this._undoHistory.length > 0) this.undo();
        return this;
    }
    redoAll() {
        while (this._redoHistory.length > 0) this.redo();
        return this;
    }

    countIncidentLines(x, y) {
        return (
              (this.getSegment(x - 1, y) === LineGrid.LINE ? 1 : 0)
            + (this.getSegment(x + 1, y) === LineGrid.LINE ? 1 : 0)
            + (this.getSegment(x, y - 1) === LineGrid.LINE ? 1 : 0)
            + (this.getSegment(x, y + 1) === LineGrid.LINE ? 1 : 0));
    }
    traverse(x, y) {
        let cx = x, cy = y;
        let lx = -1, ly = -1;
        let length = 0;

        const dx = [-1, 0, 1, 0], dy = [0, -1, 0, 1];

        while (true) {
            let nx = -1, ny = -1, cand = 0;
            for (let d = 0; d < 4; ++d) {
                if (this.getSegment(cx + dx[d], cy + dy[d]) === LineGrid.LINE) {
                    cand += 1;
                    if (!(cx + dx[d] * 2 === lx && cy + dy[d] * 2 === ly)) {
                        nx = cx + dx[d] * 2;
                        ny = cy + dy[d] * 2;
                    }
                }
            }

            if (cand >= 3) {
                return { x: -1, y: -1 };
            }
            if (nx == -1) {
                return { x: cx, y: cy, length };
            }

            length += 1;
            if (nx === x && ny === y) {
                return { x, y, length };
            }

            lx = cx; ly = cy;
            cx = nx; cy = ny;
        }
    }
    hasBranchingPoints() {
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                if (this.countIncidentLines(y * 2, x * 2) >= 3) return true;
            }
        }
        return false;
    }
    hasUniqueCycle() {
        if (this.hasBranchingPoints()) return false;

        let originX = -1, originY = -1, totalLinesDoubled = 0;
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const lines = this.countIncidentLines(y * 2, x * 2);
                totalLinesDoubled += lines;
                if (lines === 2) {
                    originX = x * 2; originY = y * 2;
                } else if (lines !== 0) {
                    return false;
                }
            }
        }
        if (originX == -1) return false;

        const totalLines = totalLinesDoubled / 2;
        const traverseResult = this.traverse(originX, originY);

        return traverseResult.x === originX && traverseResult.y === originY && traverseResult.length === totalLines;
    }
}

LineGrid.UNDECIDED = 0;
LineGrid.LINE = 1;
LineGrid.BLANK = 2;
