import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AdventOfCode {
    year: number;
    solutions: { [key: number]: any };

    constructor(year: number) {
        this.year = year;
        this.solutions = {};
    }

    async fetchInput(day: number) {
        const filePath = path.join(__dirname, `inputs/puzzleInput_${day}.txt`);
        if (fs.existsSync(filePath)) {
            console.log(`Input for day ${day} already exists.`);
            return;
        }

        const url = `https://adventofcode.com/${this.year}/day/${day}/input`;
        const sessionCookie = process.env.SESSION_COOKIE;

        if (!sessionCookie) {
            console.error('SESSION_COOKIE not found in .env file.');
            return;
        }

        try {
            const response = await fetch(url, {
                headers: {
                    Cookie: `session=${sessionCookie}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch input for day ${day}: ${response.statusText}`);
            }

            const input = await response.text();
            fs.writeFileSync(filePath, input.trim());
            console.log(`Input for day ${day} saved to ${filePath}`);
        } catch (error: Error | any) {
            console.error(error.message);
        }
    }

    registerSolution(day: number, solution: any) {
        this.solutions[day] = solution;
    }

    async run(day: number) {
        if (!this.solutions[day]) {
            console.error(`No solution registered for day ${day}.`);
            return;
        }

        await this.fetchInput(day);
        const filePath = path.join(__dirname, `inputs/puzzleInput_${day}.txt`);
        if (fs.existsSync(filePath)) {
            const solution = new this.solutions[day](filePath);
            solution.run();
        } else {
            console.log(`No input file found for day ${day}. Skipping.`);
        }
    }
}

export default AdventOfCode;
