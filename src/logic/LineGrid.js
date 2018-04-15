export default class LineGrid {
    constructor() {
        this._height = 3;
        this._width = 3;
        this._data = new Array(this.height * 2 - 1);

        for (let y = 0; y < this.height * 2 - 1; ++y) {
            this._data[y] = new Array(this.width * 2 - 1).fill(LineGrid.UNDECIDED);
        }
    }

    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    getSegment(x, y) {
        return this._data[y][x];
    }
}

LineGrid.UNDECIDED = 0;
LineGrid.LINE = 1;
LineGrid.BLANK = 2;
