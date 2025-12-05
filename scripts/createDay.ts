/**
 * Script to scaffold a new DayX folder with a template class and update Days/index.ts
 * Usage (with Deno):
 *   deno run --allow-read --allow-write scripts/createDay.ts 5
 */

const args = typeof Deno !== 'undefined' && Array.isArray(Deno.args) ? Deno.args : [];
if (args.length === 0) {
    console.error('Please provide a day number: deno run --allow-read --allow-write scripts/createDay.ts <dayNumber>');
    Deno.exit(1);
}

const day = Number(args[0]);
if (Number.isNaN(day) || day <= 0) {
    console.error('Invalid day number provided.');
    Deno.exit(1);
}

const dayDir = `./Days/Day${day}`;
const mainPath = `${dayDir}/main.ts`;
const indexPath = './Days/index.ts';

try {
    await Deno.mkdir(dayDir, { recursive: true });
} catch (err) {
    console.error('Error creating day directory:', err);
    Deno.exit(1);
}

const template = `import fs from 'node:fs';

export class Day${day} {
    filePath: string;
    inputData: string[];
    log: boolean;

    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
        this.log = true;
    }

    run() {
        this.part1();
        this.part2();
    }

    getInput(): string[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\\n');
    }

    part1() {
        if (this.log) console.log('Part 1 : (not implemented)');
        console.log('Part 1 : (not implemented)');
    }

    part2() {
        if (this.log) console.log('Part 2 : (not implemented)');
        console.log('Part 2 : (not implemented)');
    }
}
`;

try {
    const exists = await existsSync(mainPath);
    if (!exists) {
        await Deno.writeTextFile(mainPath, template);
        console.log(`Created ${mainPath}`);
    } else {
        console.log(`${mainPath} already exists, skipping.`);
    }
} catch (err) {
    console.error('Error writing main.ts:', err);
}

try {
    let indexContent = '';
    try {
        indexContent = await Deno.readTextFile(indexPath);
    } catch (err) {
        indexContent = '';
    }

    const exportLine = `export * from './Day${day}/main.js';`;
    if (!indexContent.includes(exportLine)) {
        if (!indexContent.endsWith('\n') && indexContent.length > 0) indexContent += '\n';
        indexContent += `${exportLine}\n`;
        await Deno.writeTextFile(indexPath, indexContent);
        console.log(`Updated ${indexPath}`);
    } else {
        console.log(`${indexPath} already exports Day${day}, skipping.`);
    }
} catch (err) {
    console.error('Error updating Days/index.ts:', err);
}

async function existsSync(path: string) {
    try {
        await Deno.stat(path);
        return true;
    } catch {
        return false;
    }
}

console.log('Done. You can now run the day with: deno run --allow-read --allow-net --allow-env main.ts', day);
