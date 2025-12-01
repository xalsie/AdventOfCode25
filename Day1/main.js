const fs = require('node:fs');

class Day1 {
    constructor(filePath) {
        this.filePath = filePath;
        const [left, right] = this.getInput();
        this.left = left;
        this.right = right;
    }

    run() {
        this.part1(); // 0
        // this.part2(); // 0
    }

    part1() {
        const count = 0;
        console.log('total dial points at 0: ', count);
    }

    // part2() {
    //     const count = 0;
    //     console.log('total part 2: ', count);
    // }

    getInput() {
        const left = [];
        const right = [];

        const data = fs.readFileSync(this.filePath, 'utf8');
        data.split('\n').forEach(line => {
            if (line.trim()) {
                const [x, y] = line.split('   ').map(Number);
                left.push(x);
                right.push(y);
            }
        });

        return [left, right];
    }
}

module.exports = Day1;