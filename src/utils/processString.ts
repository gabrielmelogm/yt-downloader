export function processString(input: string): string {
	const processedString = input.replace(/[^\w\s]/g, "").replace(/\s/g, "_");
	return processedString;
}
