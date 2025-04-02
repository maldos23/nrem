import chalk from "chalk";
import { RepositoriesController } from "../utils/repositoriesController.js";

export function listCommand() {
  const repositoriesController = new RepositoriesController();
  const list = repositoriesController.getRepositories();

  console.log(chalk.cyanBright("\nYou see the list of .npmrc files ⬇️ ⬇️  \n"));
  console.table(list.map((item) => ({ filename: item })));
}
