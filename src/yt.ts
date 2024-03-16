import { program } from "commander";
import { downloadVideo } from "./services/downloadVideo.service";

program.version("0.0.1");

program
	.command("download [url]")
	.description("Download a YT video")
	.action((url: string) => downloadVideo({ url }));

program.parse(process.argv);
