import fs from 'fs';
import { RepositoriesController } from '../utils/repositoriesController.js';
import { DEFAULT_REGISTRY } from '../utils/contants.js';

export function newCommand(fileName) {
    const repositoriesController = new RepositoriesController();

    const isValidFileName = /^[a-zA-Z0-9_-]+$/.test(fileName);
    if (!isValidFileName) {
        throw new Error('Invalid file name. Only letters, numbers, hyphens, and underscores are allowed.');
    }

    // Create the .npmrc file
    fs.writeFileSync(`./nrem-conf/${fileName}.npmrc`, DEFAULT_REGISTRY);

    console.log(`✅ ${fileName}.npmrc file created successfully!`);

    repositoriesController.openRepository(fileName);
}