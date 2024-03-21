export function clearTerminal() {
	process.stdout.write("\x1b[2J");
	process.stdout.write("\x1b[H");
}
