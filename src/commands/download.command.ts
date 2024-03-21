import { Command } from "commander";
import { z } from "zod";
import { downloadVideo, formatTypes } from "../services/downloadVideo.service";
import { getVideoInfo } from "../services/getVideoInfo.service";

const argumentProps = z.string().url();
const optionsProps = z
	.object({
		out: z.string().optional(),
		format: formatTypes,
		audio: z.boolean().optional(),
	})
	.nullable();

type ArgumentProps = z.infer<typeof argumentProps>;
type OptionsProps = z.infer<typeof optionsProps>;

const downloadCommand = new Command("download")
	.argument("[url]")
	.option("-o, --out [out]", "Out video path")
	.option("-f, --format [format]", "Out video format")
	.option("-a, --audio", "Downloading audio only")
	.description("Download a YT video")
	.action(async (url: ArgumentProps, options: OptionsProps) => {
		const dataUrl = argumentProps.parse(url);
		const dataOptions = optionsProps.parse(options);

		const title = (await getVideoInfo(url)).videoDetails.title;

		downloadVideo({
			url: dataUrl,
			format: dataOptions?.format,
			title,
			options: {
				filter: dataOptions?.audio ? "audioonly" : "audioandvideo",
			},
		});
	});

export { downloadCommand };
