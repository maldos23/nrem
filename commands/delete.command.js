import { exec } from "child_process";
import { RepositoriesController } from "../utils/repositoriesController.js";

export function deleteCommand(fileName) {
  const repositoriesController = new RepositoriesController();

  const currentFile = repositoriesController.selectRepository(fileName);

  console.log(`🗑 Deleting ${currentFile}.npmrc file...`);

  exec(`rm ./nrem-conf/${currentFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`✅ ${fileName}.npmrc file deleted successfully!`);
  });
}
