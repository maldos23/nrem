import { RepositoriesController } from "../utils/repositoriesController.js";

/**
 * Edits the specified .npmrc file if it exists in the repository list.
 *
 * @param {string} fileName - The name of the file to edit (without extension).
 */
export function editCommand(fileName) {
  const repositoriesController = new RepositoriesController();
  const selectedRepository = repositoriesController.selectRepository(fileName);
  
  console.log(`📝 Editing ${selectedRepository} file...`);

  repositoriesController.openRepository(selectedRepository);
}
