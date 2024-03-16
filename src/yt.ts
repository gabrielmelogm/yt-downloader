import { program } from "commander";
import { downloadCommand } from "./commands/download.command";

program.version("0.0.1");

program.addCommand(downloadCommand);

program.parse(process.argv);
