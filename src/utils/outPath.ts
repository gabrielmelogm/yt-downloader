import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(__dirname, "..", "..");
const outDir = path.join(rootDir, "out");

export function outPath(): string {
	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir, { recursive: true });
	}

	return outDir;
}
