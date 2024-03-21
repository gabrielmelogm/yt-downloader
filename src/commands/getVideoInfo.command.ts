import select from "@inquirer/select";
import { Command } from "commander";
import { z } from "zod";
import { getVideoInfo } from "../services/getVideoInfo.service";

const argumentProps = z.string().url();
const optionsProps = z.object({}).nullable();

type ArgumentProps = z.infer<typeof argumentProps>;
type OptionsProps = z.infer<typeof optionsProps>;

const infoCommand = new Command("info")
	.argument("[url]")
	.description("Get info for a YT video")
	.action(async (url: ArgumentProps, options: OptionsProps) => {
		const dataUrl = argumentProps.parse(url);
		const dataOptions = optionsProps.parse(options);

		const info = await getVideoInfo(dataUrl);

		const formats = [];
		const choices = [];

		for (const fm of info.formats) {
			const data = {
				type: fm.mimeType,
				quality: fm.quality,
				resolution: fm.qualityLabel,
				container: fm.container,
				fps: fm.fps,
				width: fm.width,
				height: fm.height,
			};

			formats.push(data);
			choices.push({
				name: `${data.container} - ${data.quality}`,
				value: data.container,
				description: `
Type: ${data.type?.split(";")[0].replace(";", "")}
Codec: ${data.type?.split("codecs=")[1].replace('"', "").replace('"', "")}
Resolution: ${data.resolution ?? "unknown"} - ${
					data.fps ? `${data.fps}fps` : "unknown"
				}
Size: ${data.width ?? "unknown"} X ${data.height ?? "unknown"}
        `,
			});
		}

		const quality = await select({
			message: "Select a quality",
			choices,
		});

		console.log(quality);
	});

export { infoCommand };
