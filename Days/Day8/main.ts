import fs from "node:fs";

export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

export class Day8 {
    filePath: string;
    inputData: Vec3[];
    log: boolean;

    constructor(inputFilePath: string) {
        this.filePath = inputFilePath;
        this.inputData = this.getInput();
        this.log = true;

        console.log("--- Day 8: electrical junction boxes ---");
    }

    private getInput(): Vec3[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return data.split('\n').map(line => {
            const [x, y, z] = line.split(',').map(s => Number(s.trim()));
            return { x, y, z };
        });
    }

    run() {
        this.part1(); // 26400
        this.part2(); // 8199963486
    }

    private part1() {
        const junctionCount = this.solve(1000);

        console.log('Part 1 :', junctionCount);
    }

    private part2() {
        const junctionCount = this.solve(0);

        console.log('Part 2 :', junctionCount);
    }

    private solve(count: number): number {

        //kruskal
        const junctions = this.inputData;
        const n = junctions.length;

        const circuits: Set<number>[] = junctions.map((_, i) => new Set<number>([i]));

        const pairs: { a: number; b: number; dist: number }[] = [];
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const d = this.sqDist(junctions[i], junctions[j]);
                pairs.push({ a: i, b: j, dist: d });
            }
        }

        pairs.sort((p, q) => p.dist - q.dist);

        for (const { a, b } of pairs) {
            const saIndex = circuits.findIndex(c => c.has(a));
            const sbIndex = circuits.findIndex(c => c.has(b));

            if (saIndex !== sbIndex && saIndex >= 0 && sbIndex >= 0) {
                const sa = circuits[saIndex];
                const sb = circuits[sbIndex];

                for (const v of sb) sa.add(v);
                circuits.splice(sbIndex, 1);
            }

            count--;
            if (count === 0) {
                const sizes = circuits.map(c => c.size).sort((x, y) => y - x);
                const top3 = [sizes[0] || 1, sizes[1] || 1, sizes[2] || 1];
                return top3[0] * top3[1] * top3[2];
            }

            //until we have one big circuit
            if (circuits.some(c => c.size === n)) {
                return junctions[a].x * junctions[b].x;
            }
        }

        return -1;
    }

    private sqDist(a: Vec3, b: Vec3): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }
}
