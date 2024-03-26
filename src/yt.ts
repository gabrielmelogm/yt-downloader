import { program } from "commander";
import { downloadCommand } from "./commands/download.command";
import { stepForStep } from "./commands/step-for-step.command";

program.version("0.0.1");

program.action(stepForStep);

program.addCommand(downloadCommand);

program.parse(process.argv);
