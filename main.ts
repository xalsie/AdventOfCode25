import AdventOfCode from './AdventOfCode.js';
import * as Days from './Days/index.js';

const aoc = new AdventOfCode(2025);

for (const key of Object.keys(Days)) {
    const match = key.match(/^Day(\d+)$/);
    if (match) {
        const dayNum = Number(match[1]);
        aoc.registerSolution(dayNum, (Days as any)[key]);
    }
}

const argv = typeof Deno !== 'undefined' && typeof Deno.args !== 'undefined'
    ? Deno.args
    : process.argv.slice(2);

const dayToRun = argv[0] ? Number(argv[0]) : null;

if (dayToRun && !Number.isNaN(dayToRun)) {
    aoc.run(dayToRun);
} else {
    console.error('No days registered.');
}
