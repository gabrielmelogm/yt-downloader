import fs from "node:fs";
import yt from "ytdl-core";

import { outPath } from "../utils/outPath";

interface IDownloadVideoProps {
	url: string;
	options?: yt.downloadOptions;
}

const outDir = outPath();

export function downloadVideo({ url, options }: IDownloadVideoProps): void {
	yt(url)
		.pipe(fs.createWriteStream(`${outDir}/video.mp4`))
		.on("finish", () => {
			console.log("Download has finished");
		})
		.on("error", (error) => {
			console.error(`Unexpected error: ${error}`);
		});

	return;
}
