import fs from 'node:fs';

export class Day1 {
    filePath: string;
    inputData: { direction: string; distance: number }[];

    constructor(inputData: string) {
        this.filePath = inputData;
        this.inputData = this.getInput();
    }

    run() {
        this.part1(); // 1064
        this.part2(); // 6122
    }

    getInput() {
        const rotations: { direction: string; distance: number }[] = [];
        const data = fs.readFileSync(this.filePath, 'utf8');
        data.split('\n').forEach(line => {
            if (line.trim()) {
                const direction = line.charAt(0);
                const distance = parseInt(line.substring(1), 10);
                rotations.push({ direction, distance });
            }
        });

        return rotations;
    }

    part1() {
        let count = 0;
        let dial = 50;

        this.inputData.forEach(({ direction, distance }) => {
            if (direction === 'R') {
                dial = (dial + distance) % 100;
            } else if (direction === 'L') {
                dial = ((dial - distance) % 100 + 100) % 100;
            }

            if (dial === 0) {
                count++;
            }
        });

        console.log('Part 2 : total dial points at 0: ', count);
    }

    part2() {
        let count = 0;
        let dial = 50;

        this.inputData.forEach(({ direction, distance }) => {
            const t1 = direction === 'R'
                ? (dial === 0 ? 100 : 100 - dial)
                : (dial === 0 ? 100 : dial);

            const hits = distance < t1 ? 0 : 1 + Math.floor((distance - t1) / 100);

            dial = direction === 'R'
                ? (dial + distance) % 100
                : ((dial - distance) % 100 + 100) % 100;

            count += hits;
        });

        console.log('Part 2 : total dial passes at 0: ', count);
    }
}
