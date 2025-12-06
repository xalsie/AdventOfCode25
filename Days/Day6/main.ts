import fs from 'node:fs';

export class Day6 {
    filePath: string;
    inputData: string[];
    log: boolean;

    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
        this.log = true;
    }

    run() {
        this.part1(); // 5552221122013
        this.part2(); // 11371597126232
    }

    getInput(): string[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\n');
    }

    part1() {
        const numbers: number[][] = [];
        const operators: string[] = [];

        for (const line of this.inputData) {
            const numMatches = line.trim().match(/\d+/g);
            if (numMatches) {
                numbers.push(numMatches.map(Number));
            } else {
                const opMatches = line.match(/[\*\+]/g);
                if (opMatches) operators.push(...opMatches);
            }
        }

        const total = numbers[0].reduce((sum, _, col) => {
            const result = numbers.reduce((acc, row, i) => {
                const operator = i === 0 ? '+' : (operators[col] || '+');
                return operator === '*' ? acc * row[col] : acc + row[col];
            }, 0);
            return sum + result;
        }, 0);

        console.log('Part 1 :', total);
    }

    part2() {
        const numberLines = this.inputData.filter(l => /\d/.test(l));
        const operatorLine = this.inputData.find(l => /[*+]/.test(l)) || '';
        const operators = operatorLine.match(/[\*\+]/g) || [];

        const maxLen = Math.max(...numberLines.map(l => l.length), 0);
        const padded = numberLines.map(l => l.padEnd(maxLen, ' '));

        const groups: number[][] = [];
        let current: number[] = [];

        for (let c = maxLen - 1; c >= 0; c--) {
            let colStr = '';
            for (let r = 0; r < padded.length; r++) {
                const ch = padded[r][c];
                if (/\d/.test(ch)) colStr += ch;
            }

            if (colStr) {
                current.push(Number(colStr));
            } else if (current.length) {
                groups.push(current);
                current = [];
            }
        }
        if (current.length) groups.push(current);

        let total = 0;
        groups.forEach((built, gi) => {
            const operator = operators[operators.length - 1 - gi] || '+';
            const colResult = built.reduce((acc, val, idx) =>
                idx === 0 ? val : (operator === '*' ? acc * val : acc + val), 0 as number);
            total += colResult;
        });

        console.log('Part 2 :', total);
    }
}
