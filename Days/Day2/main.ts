import fs from 'node:fs';

type Range = { start: bigint; end: bigint };

export class Day2 {
    filePath: string;
    inputData: Range[];
    
    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
    }

    run() {
        this.part1();
        this.part2();
    }

    getInput(): Range[] {
        const ranges: Range[] = [];
        const data = fs.readFileSync(this.filePath, 'utf8');
        data.split('\n').forEach(line => {
            if (line.trim()) {
                const range: Range[] = line.split(',').map(range => {
                    const [start, end] = range.split('-').map(x => BigInt(x));
                    return { start, end };
                })
                ranges.push(...range);
            }
        });

        return ranges;
    }

    part1() {
        const inputRanges: Range[] = this.inputData;
        let total = BigInt(0);
        const ten = BigInt(10);

        let globalMaxEnd = inputRanges[0].end;
        for (const range of inputRanges) {
            if (range.end > globalMaxEnd) globalMaxEnd = range.end;
        }

        let maxLength = 0;
        for (let length = 1; ; length++) {
            const startValue = ten ** BigInt(length - 1);
            const candidateNumber = startValue * (ten ** BigInt(length)) + startValue;
            if (candidateNumber > globalMaxEnd) break;
            maxLength = length;
        }

        for (let length = 1; length <= maxLength; length++) {
            const startValue = ten ** BigInt(length - 1);
            const endValue = ten ** BigInt(length) - 1n;

            for (let data = startValue; data <= endValue; data++) {
                const dataStr = data.toString();
                const fullNumberStr = dataStr + dataStr;
                const fullNumber = BigInt(fullNumberStr);

                for (const range of inputRanges) {
                    const rangeStart = range.start;
                    const rangeEnd = range.end;
                    if (fullNumber >= rangeStart && fullNumber <= rangeEnd) {
                        total += fullNumber;
                        break;
                    }
                }
            }
        }

        console.log('Part 1 : ', total.toString());
    }

    part2() {
        const inputRanges: Range[] = this.inputData;
        let total = BigInt(0);
        const ten = BigInt(10);

        let globalMaxEnd = inputRanges[0].end;
        for (const range of inputRanges) {
            if (range.end > globalMaxEnd) globalMaxEnd = range.end;
        }

        const maxDigits = globalMaxEnd.toString().length;
        const maxPatternLen = Math.floor(maxDigits / 2);

        const seen = new Set<string>();

        for (let patternLen = 1; patternLen <= maxPatternLen; patternLen++) {
            const startValue = ten ** BigInt(patternLen - 1);
            const endValue = ten ** BigInt(patternLen) - 1n;

            for (let data = startValue; data <= endValue; data++) {
                const dataStr = data.toString();

                const maxRepeats = Math.floor(maxDigits / patternLen);

                for (let repeats = 2; repeats <= maxRepeats; repeats++) {
                    const fullNumberStr = dataStr.repeat(repeats);
                    if (fullNumberStr.length > maxDigits) break;

                    const fullNumber = BigInt(fullNumberStr);
                    if (fullNumber > globalMaxEnd) break;

                    if (seen.has(fullNumberStr)) continue;

                    let inRange = false;
                    for (const range of inputRanges) {
                        if (fullNumber >= range.start && fullNumber <= range.end) {
                            inRange = true;
                            break;
                        }
                    }

                    if (inRange) {
                        total += fullNumber;
                        seen.add(fullNumberStr);
                    }
                }
            }
        }

        console.log('Part 2 : ', total.toString());
    }
}
