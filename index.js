import { deleteCommand } from "./commands/delete.command.js";
import { editCommand } from "./commands/edit.command.js";
import { listCommand } from "./commands/list.command.js";
import { newCommand } from "./commands/new.command.js";
import { useCommand } from "./commands/use.command.js";
import ProgramBase from "./utils/progamBase.js";
import { readFile } from "fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

const program = new ProgramBase();

// Set the version of the program
program.setVersion(packageJson.version);
program.setName(packageJson.name);
program.setDescription("More easy manage .npmrc files ;)");

program
  .command("new")
  .description("Create a new .npmrc file")
  .argument("<filename>", "Name of the .npmrc file")
  .action(newCommand);
program
  .command("use")
  .description("Switch between .npmrc files")
  .argument("<filename>", "Name of the .npmrc file")
  .option("-i, --index <file-index>", "Index of the .npmrc file")
  .action(useCommand);
program
  .command("edit")
  .description("Edit an existing .npmrc file")
  .argument("<filename>", "Name of the .npmrc file")
  .option("-i, --index <file-index>", "Index of the .npmrc file")
  .action(editCommand);
program
  .command("delete")
  .description("Delete an existing .npmrc file")
  .argument("<filename>", "Name of the .npmrc file")
  .option("-i, --index <file-index>", "Index of the .npmrc file")
  .action(deleteCommand);
program
  .command("list")
  .description("List all .npmrc files")
  .action(listCommand);

program.init();
