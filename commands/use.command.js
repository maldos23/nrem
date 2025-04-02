import { DEFFAULT_DIR } from "../utils/contants.js";
import { RepositoriesController } from "../utils/repositoriesController.js";
import fs from "fs";

export function useCommand(fileName) {
  const repositoriesController = new RepositoriesController();
  const selectedRepository = repositoriesController.selectRepository(fileName);
  
  const filePath = `${DEFFAULT_DIR}/${selectedRepository}`;
  const fileContent = fs.readFileSync(filePath, "utf8");
  
  const updatedContent = `#use\n${fileContent}`;
  fs.writeFileSync(filePath, updatedContent, "utf8");
}
