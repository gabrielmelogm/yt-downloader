import { program } from "commander";
import { downloadCommand } from "./commands/download.command";
import { infoCommand } from "./commands/getVideoInfo.command";

program.version("0.0.1");

program.addCommand(downloadCommand);
// program.addCommand(infoCommand);

program.parse(process.argv);
