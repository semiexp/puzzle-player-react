export default class NumberlinkProblem {
    constructor(height, width) {
        this._height = height;
        this._width = width;
        this._clue = new Array(height);
        for (let y = 0; y < height; ++y) {
            this._clue[y] = new Array(width).fill(NumberlinkProblem.NO_CLUE);
        }
    }

    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    getClue(x, y) {
        return this._clue[y][x];
    }
    setClue(x, y, c) {
        this._clue[y][x] = c;
    }
}

NumberlinkProblem.NO_CLUE = -1;
