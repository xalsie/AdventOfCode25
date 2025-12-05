import fs from 'node:fs';

export class Day5 {
    filePath: string;
    inputData: string[];
    log: boolean;

    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
        this.log = true;
    }

    run() {
        this.part1(); // 529
        this.part2(); // 344260049617193
    }

    getInput(): string[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\n');
    }

    part1() {
        const lines = this.inputData.map(l => l.replace(/\r$/, ''));
        const emptyIndex = lines.findIndex(l => !l.trim());

        const rangesLines = lines.slice(0, emptyIndex);
        const idsLines = lines.slice(emptyIndex + 1);

        const ranges = rangesLines
            .map(l => l.trim())
            .filter(Boolean)
            .map(l => l.split('-').map(s => Number(s)) as [number, number]);

        const ids = idsLines.filter(Boolean).map(Number);

        const freshCount = ids.reduce((count, id) =>
            count + (ranges.some(([a, b]) => id >= a && id <= b) ? 1 : 0), 0);

        console.log(`Part 1 : ${freshCount}`);
    }

    part2() {
        const lines = this.inputData.map(l => l.replace(/\r$/, ''));
        const emptyIndex = lines.findIndex(l => !l.trim());

        const ranges = lines
            .slice(0, emptyIndex)
            .filter(Boolean)
            .map(l => l.split('-').map(Number) as [number, number]);

        ranges.sort((a, b) => a[0] - b[0]);

        const init = { total: 0, curStart: ranges[0][0], curEnd: ranges[0][1] };
        const { total, curStart, curEnd } = ranges.slice(1).reduce((acc, [s, e]) => {
            if (s <= acc.curEnd + 1) {
                acc.curEnd = Math.max(acc.curEnd, e);
            } else {
                acc.total += acc.curEnd - acc.curStart + 1;
                acc.curStart = s;
                acc.curEnd = e;
            }
            return acc;
        }, init);

        console.log(`Part 2 : ${total + (curEnd - curStart + 1)}`);
    }
}
