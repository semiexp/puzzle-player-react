import LineGrid from 'logic/LineGrid'

export default class NumberlinkField extends LineGrid {
    constructor(problem) {
        super(problem.height, problem.width);

        this._clue = new Array(this.height);
        for (let y = 0; y < this.height; ++y) {
            this._clue[y] = new Array(this.width);
            for (let x = 0; x < this.width; ++x) {
                this._clue[y][x] = problem.getClue(x, y);
            }
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
                if (this._clue[y][x] !== NumberlinkField.NO_CLUE) {
                    ret.push({ x, y, value: this._clue[y][x] });
                }
            }
        }
        return ret;
    }

    checkAnswer() {
        if (this.hasBranchingPoints()) return false;

        let expectedLinesDoubled = 0;
        let linesInChainsDoubled = 0;

        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                let lines = this.countIncidentLines(x * 2, y * 2);
                expectedLinesDoubled += lines;
                if ((this.getClue(x, y) !== NumberlinkField.NO_CLUE) !== (lines === 1)) return false;

                if (lines == 1) {
                    let traverseResult = this.traverse(x * 2, y * 2);
                    if (traverseResult.x === -1 || (traverseResult.x === x * 2 && traverseResult.y === y * 2)) return false;
                    if (this.getClue(x, y) === NumberlinkField.NO_CLUE || this.getClue(x, y) !== this.getClue(traverseResult.x / 2, traverseResult.y / 2)) return false;
                    linesInChainsDoubled += traverseResult.length;
                }
            }
        }

        return expectedLinesDoubled === linesInChainsDoubled;
    }
}

NumberlinkField.NO_CLUE = -1;
