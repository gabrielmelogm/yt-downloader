import spinners from "cli-spinners";

interface LoaderProps {
	start: () => void;
	stop: () => void;
}

export function createLoader(title: string): LoaderProps {
	const spinner = spinners.dots;
	let interval: NodeJS.Timeout | null = null;
	let frame = 0;

	function start() {
		interval = setInterval(() => {
			frame = ++frame % spinner.frames.length;
			process.stdout.write(`\r ${spinner.frames[frame]} ${title}`);
		}, spinner.interval);
	}

	function stop() {
		if (interval) {
			clearInterval(interval);
			process.stdout.write("\r");
		}
	}

	return {
		start,
		stop,
	};
}
