import fs from "node:fs";
import yt from "ytdl-core";

import { z } from "zod";
import { outPath } from "../utils/outPath";

export const formatTypes = z.enum(["mp4", "webm"]).optional().default("mp4");

type FormatTypes = z.infer<typeof formatTypes>;

interface IDownloadVideoProps {
	url: string;
	format?: FormatTypes;
	options?: yt.downloadOptions;
}

const outDir = outPath();

export function downloadVideo({
	url,
	format,
	options,
}: IDownloadVideoProps): void {
	yt(url, options)
		.pipe(fs.createWriteStream(`${outDir}/video.${format}`))
		.on("finish", () => {
			console.log("Download has finished");
		})
		.on("error", (error) => {
			console.error(`Unexpected error: ${error}`);
		});

	return;
}
