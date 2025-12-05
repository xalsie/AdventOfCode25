import fs from 'node:fs';

export class Day3 {
    filePath: string;
    inputData: string[];
    log: boolean;
    
    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();

        this.log = false;
    }

    run() {
        this.part1(); // 17430
        this.part2(); // 171975854269367
    }

    getInput(): string[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        const lines = data.split('\n');

        if (this.log) console.log('Input data lines: ', lines, lines.length);
        
        return lines;
    }

    part1() {
        let voltage = 0;
        for (const line of this.inputData) {
            if (line.length < 2) continue;

            let best = -1;
            let maxPrev = -1;

            for (let i = 0; i < line.length; i++) {
                const code = line.charCodeAt(i);
                if (code < 48 || code > 57) continue; // not a digit
                const d = code - 48;

                if (maxPrev >= 0) {
                    const val = maxPrev * 10 + d;
                    if (val > best) best = val;
                }

                if (d > maxPrev) maxPrev = d;
            }

            if (best >= 0) {
                voltage += best;
                if (this.log) console.log(`Line: ${line} -> best: ${best}`);
            }
        }

        console.log('Part 1 : ', voltage);
    }

    part2() {
        const MAX_BATTERY = 12;
        let voltage = 0;

        for (const line of this.inputData) {
            const n = line.length;
            const resultChars: string[] = [];
            let start = 0;

            for (let pick = 0; pick < MAX_BATTERY; pick++) {
                const end = n - (MAX_BATTERY - pick);
                const maxDigit = Math.max(...line.slice(start, end + 1).split('').map(c => Number(c)));
                const bestPos = line.indexOf(String(maxDigit), start);
                resultChars.push(line[bestPos]);
                start = bestPos + 1;
            }

            voltage += Number(resultChars.join(''));
            if (this.log) console.log(`Line: ${line} -> best: ${resultChars.join('')}`);
        }

        console.log('Part 2 : ', voltage);
    }
}
