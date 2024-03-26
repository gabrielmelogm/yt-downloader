import { input, select } from "@inquirer/prompts";
import figlet from "figlet";
import { getErrorMap, z } from "zod";
import { downloadVideo } from "../services/downloadVideo.service";
import { getVideoInfo } from "../services/getVideoInfo.service";

export const stepForStep = async () => {
	await figlet("YTCLI Downloader", (err, data) => {
		if (err) {
			console.log("Something went wrong...");
			console.dir(err);
			return;
		}
		console.log(data);
		console.log("\n \n \n");
	});

	try {
		const url = await input({ message: "Enter your url video: " });

		z.string({ required_error: "Url not informed" })
			.url({ message: "Invalid url format" })
			.parse(url);

		const outFormat = await select({
			message: "Out video format: ",
			default: "audio_video",
			choices: [
				{
					name: "Audio and Video",
					value: "audio_video",
					description: "Download video with audio",
				},
				{
					name: "Only audio",
					value: "audio",
					description: "Download only video audio",
				},
			],
		});

		const outPath = await input({
			message: "Enter custom out path: ",
			default: "/Videos",
		});

		const title = (await getVideoInfo(url)).videoDetails.title;

		downloadVideo({
			url,
			title,
			options: {
				filter: outFormat === "audio" ? "audioonly" : "audioandvideo",
			},
			out: outPath !== "/Videos" ? outPath : "",
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			error.issues.map((er) => console.error(er.message));
			return;
		}

		console.log("Unexpected error");
	}
};
