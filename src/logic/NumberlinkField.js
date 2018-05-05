import LineGrid from 'logic/LineGrid'

export default class NumberlinkField extends LineGrid {
    constructor() {
        super();

        this._clue = new Array(this.height);
        for (let y = 0; y < this.height; ++y) {
            this._clue[y] = new Array(this.width).fill(NumberlinkField.NO_CLUE);
        }
    }

    getClue(x, y) {
        return this._clue[y][x];
    }
    setClue(x, y, c) {
        this._clue[y][x] = c;
    }
    getAllClues() {
        let ret = [];
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                if (this._clue[y][x] != NumberlinkField.NO_CLUE) {
                    ret.push({ x, y, value: this._clue[y][x] });
                }
            }
        }
        return ret;
    }
}

NumberlinkField.NO_CLUE = -1;
