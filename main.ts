import AdventOfCode from './AdventOfCode.js';
import {
    Day1, Day2
} from './Days/index.js';

const aoc = new AdventOfCode(2025);

aoc.registerSolution(1, Day1);
aoc.registerSolution(2, Day2);

aoc.run(1);
