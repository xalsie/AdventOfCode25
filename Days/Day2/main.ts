import fs from 'node:fs';

export class Day2 {
    filePath: string;
    inputData: string[];
    
    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
    }

    run() {
        this.part1();
        this.part2();
    }

    getInput() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\n');
    }

    part1() {
        // Implement Part 1 logic here
        console.log('Part 1 : ', 'Not implemented yet');
    }

    part2() {
        // Implement Part 2 logic here
        console.log('Part 2 : ', 'Not implemented yet');
    }
}
