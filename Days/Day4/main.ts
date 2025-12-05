import fs from 'node:fs';

export class Day4 {
    filePath: string;
    inputData: string[];
    log: boolean;
    
    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();

        this.log = false;
    }

    run() {
        this.part1(); // 1370
        this.part2(); // 8437
    }

    getInput(): string[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        const lines = data.split('\n').map(l => l.replace(/\r$/, ''))
            .filter(l => l.length > 0);

        if (this.log) console.log('Input data lines: ', lines, lines.length);

        return lines;
    }

    part1() {
        const grid = this.inputData.map(line => line.split(''));
        const height = grid.length;
        const width = height > 0 ? grid[0].length : 0;
        const matrix: [number, number, number] = [-1, 0, 1]

        let paperAccess = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (grid[y][x] !== '@') continue;

                let taken = 0;
                for (const dy of matrix) {
                    for (const dx of matrix) {
                        if (dx === 0 && dy === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
                        if (ny < 0 || ny >= height || nx < 0 || nx >= width) continue;
                        if (grid[ny][nx] === '@') taken++;
                    }
                }

                if (taken < 4) paperAccess++;
            }
        }

        console.log('Part 1 : ', paperAccess);
    }

    part2() {
        const grid = this.inputData.map(line => line.split(''));
        const height = grid.length;
        const width = height > 0 ? grid[0].length : 0;
        const matrix: [number, number, number] = [-1, 0, 1];

        let totalRemoved = 0;

        while (true) {
            const toRemove: [number, number][] = [];

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (grid[y][x] !== '@') continue;

                    let taken = 0;
                    for (const dy of matrix) {
                        for (const dx of matrix) {
                            if (dx === 0 && dy === 0) continue;
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny < 0 || ny >= height || nx < 0 || nx >= width) continue;
                            if (grid[ny][nx] === '@') taken++;
                        }
                    }

                    if (taken < 4) toRemove.push([y, x]);
                }
            }

            if (toRemove.length === 0) break;

            for (const [y, x] of toRemove) {
                grid[y][x] = '.';
            }

            totalRemoved += toRemove.length;
        }

        console.log('Part 2 : ', totalRemoved);
    }
}
