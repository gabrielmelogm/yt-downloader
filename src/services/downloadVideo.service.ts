import fs from "node:fs";
import yt from "ytdl-core";

import { z } from "zod";
import { createLoader } from "../utils/loader";
import { outPath } from "../utils/outPath";
import { processString } from "../utils/processString";

export const formatTypes = z.enum(["mp4", "webm"]).optional().default("mp4");

type FormatTypes = z.infer<typeof formatTypes>;

interface IDownloadVideoProps {
	url: string;
	title: string;
	format?: FormatTypes;
	options?: yt.downloadOptions;
	out?: string;
}

export function downloadVideo({
	url,
	format = "mp4",
	title,
	options,
	out,
}: IDownloadVideoProps): void {
	const outDir = outPath(out);

	const loader = createLoader(`Downloading video: ${title}`);

	const formatTitle = processString(title);

	yt(url, options)
		.pipe(fs.createWriteStream(`${outDir}/${formatTitle}.${format}`))
		.on("ready", () => {
			loader.start();
		})
		.on("finish", () => {
			loader.stop();
			console.log("\n \n \n ✅ Download has finished");
		})
		.on("error", (error) => {
			loader.stop();
			console.error(`Unexpected error: ${error}`);
		});

	return;
}
