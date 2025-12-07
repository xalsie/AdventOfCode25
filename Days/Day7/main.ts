import fs from 'node:fs';

export class Day7 {
    filePath: string;
    inputData: string[];
    log: boolean;

    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
        this.log = true;

        console.log('--- Day 7: Laboratories ---');
    }

    run() {
        this.part1(); // 1590
        this.part2(); // 20571740188555
    }

    getInput(): string[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\n');
    }

    part1() {
        const gridRows = this.inputData.map(line => line.split(''));
        const rowCount = gridRows.length;
        const colCount = gridRows[0].length;

        let startRow = -1;
        let startCol = -1;
        for (let row = 0; row < rowCount; row++) {
            const foundCol = gridRows[row].indexOf('S');
            if (foundCol !== -1) {
                startRow = row; 
                startCol = foundCol;
                break;
            }
        }

        let branchCount = 0;
        let activeColumns = new Set<number>([startCol]);

        for (let row = startRow; row < rowCount - 1 && activeColumns.size > 0; row++) {
            const nextActiveColumns = new Set<number>();
            const nextRow = row + 1;
            const nextRowArray = gridRows[nextRow];

            for (const col of activeColumns) {
                if (col < 0 || col >= colCount) continue;
                const cellChar = nextRowArray[col];
                if (cellChar === '^') {
                    branchCount++;
                    if (col - 1 >= 0) nextActiveColumns.add(col - 1);
                    if (col + 1 < colCount) nextActiveColumns.add(col + 1);
                } else {
                    nextActiveColumns.add(col);
                }
            }

            activeColumns = nextActiveColumns;
        }

        console.log('Part 1 :', branchCount);
    }

    part2() {
        const gridRows = this.inputData.map(line => line.split(''));
        const rowCount = gridRows.length;
        const colCount = gridRows[0].length;

        let startRow = -1;
        let startCol = -1;
        for (let row = 0; row < rowCount; row++) {
            const foundCol = gridRows[row].indexOf('S');
            if (foundCol !== -1) {
                startRow = row;
                startCol = foundCol;
                break;
            }
        }

        const memo = new Map<string, bigint>();

        const countPoints = (row: number, column: number): bigint => {
            if (row < 0 || row >= rowCount || column < 0 || column >= colCount) return 1n;
            const key = `${row},${column}`;
            if (memo.has(key)) return memo.get(key) || 0n;
            const cell = gridRows[row][column];
            let res: bigint;
            if (cell === '^') {
                const left = countPoints(row + 1, column - 1);
                const right = countPoints(row + 1, column + 1);
                res = left + right;
            } else {
                res = countPoints(row + 1, column);
            }
            memo.set(key, res);
            return res;
        };

        const startR = startRow + 1;
        const timelines = countPoints(startR, startCol);

        console.log('Part 2 :', timelines.toString());
    }
}
