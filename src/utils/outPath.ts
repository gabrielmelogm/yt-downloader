import fs from "node:fs";
import path from "node:path";

const userProfile: string = process.env.USERPROFILE ?? "";

const defaultPath = path.join(userProfile, "Videos");

export function outPath(userInputPath?: string): string {
	let outPath = defaultPath;

	if (userInputPath) {
		const resolveUserInputPath = path.resolve(userInputPath);
		outPath = resolveUserInputPath;
	}

	if (!fs.existsSync(outPath)) {
		fs.mkdirSync(outPath, { recursive: true });
	}

	return outPath;
}
