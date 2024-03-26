#!/usr/bin/env node

import { program } from "commander";
import { downloadCommand } from "./commands/download.command";
import { stepForStep } from "./commands/step-for-step.command";

program.version("1.0.0");

program.action(stepForStep);

program.addCommand(downloadCommand);

program.parse(process.argv);
