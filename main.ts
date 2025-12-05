import AdventOfCode from './AdventOfCode.js';
import {
    Day1, Day2, Day3
} from './Days/index.js';

const aoc = new AdventOfCode(2025);

aoc.registerSolution(1, Day1);
aoc.registerSolution(2, Day2);
aoc.registerSolution(3, Day3);

// aoc.run(1);
// aoc.run(2);
aoc.run(3);
