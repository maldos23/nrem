import fs from 'fs';
import chalk from 'chalk';
import { exec } from 'child_process';
import { DEFFAULT_DIR } from './contants.js';
/**
 * Controller for managing repositories.
 */
export class RepositoriesController {
    /**
     * Initializes the RepositoriesController.
     */
    constructor() {
        this.directoryPath = DEFFAULT_DIR;
    }

    /**
     * Retrieves the list of repository files in the directory.
     * @returns {string[]} Array of repository file names.
     */
    getRepositories() {
        try {
            return fs.readdirSync(this.directoryPath);
        } catch (err) {
            console.error('Error reading directory:', err);
            return [];
        }
    }

    /**
     * Opens a repository file in VS Code.
     * @param {string} fileName - The name of the repository file to open.
     */
    openRepository(fileName) {
        if (!fileName) {
            console.error('File name is required to open a repository.');
            return;
        }

        exec(`code ${this.directoryPath}/${fileName}`, (error) => {
            if (error) {
                console.error(`Error opening file: ${error}`);
                return;
            }

            const fileNameStyled = chalk.bgGrey(` ${fileName} `);
            console.log(chalk.bgWhiteBright(` Opened in VS Code: ${fileNameStyled}`));
        });
    }

    /**
     * Checks if a repository file exists.
     * @param {string} fileName - The name of the repository file to check.
     * @returns {boolean} True if the file exists, false otherwise.
     */
    fileExists(fileName) {
        const repositories = this.getRepositories();
        return repositories.includes(`${fileName}.npmrc`) || repositories.includes(fileName);
    }

    /**
     * Selects a repository file if it exists.
     * @param {string} fileName - The name of the repository file to select.
     * @returns {string|null} The selected file name or null if it doesn't exist.
     */
    selectRepository(fileName) {
        if (!fileName) {
            console.error('File name is required to select a repository.');
            return null;
        }

        if (!this.fileExists(fileName)) {
            this.displayWarningMessage(fileName);
            throw new Error(`The file ${fileName}.npmrc doesn't exist.`);
        }

        return this.formatFileName(fileName);
    }

    /**
     * Formats the given file name to ensure it has the `.npmrc` extension.
     * If the file name already ends with `.npmrc`, it is returned as is.
     * Otherwise, the `.npmrc` extension is appended to the file name.
     *
     * @param {string} fileName - The name of the file to format.
     * @returns {string} The formatted file name with the `.npmrc` extension.
     */
    formatFileName(fileName) {
        if (fileName.endsWith('.npmrc')) {
            return fileName;
        }
        return `${fileName}.npmrc`;
    }

    /**
     * Displays a warning message if a repository file doesn't exist.
     * @param {string} fileName - The name of the repository file.
     */
    displayWarningMessage(fileName) {
        console.log(chalk.yellow('⚠️ Warning: Command failed.'));
        console.log(chalk.bgYellowBright(` The file ${fileName}.npmrc doesn't exist. `));
    }
}