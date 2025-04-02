import fs from 'fs';
import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import { DEFFAULT_DIR } from './contants.js';
/**
 * ProgramBase class extends the Command class from Commander.js
 * and provides additional functionality for initializing, setting
 * metadata, and managing directories.
 */
export default class ProgramBase extends Command {
  /**
   * Initializes the program by parsing command-line arguments
   * and ensuring the default directory exists.
   */
  init() {
    this.parse(process.argv);
    this._ensureDefaultDirectory();
  }

  /**
   * Sets the version of the program.
   * @param {string} version - The version string to set.
   */
  setVersion(version) {
    this.version(version);
  }

  /**
   * Sets the name of the program.
   * @param {string} name - The name of the program.
   */
  setName(name) {
    this.name(name);
  }

  /**
   * Sets the description of the program, including a styled logo and text.
   * @param {string} description - The description of the program.
   */
  setDescription(description) {
    const logo = this._generateLogo();
    const styledDescription = this._styleDescription(description);
    this.description(`${logo} \n\n ${styledDescription}`);
  }

  /**
   * Ensures the default directory exists. If it does not exist, it creates it.
   * @private
   */
  _ensureDefaultDirectory() {
    if (!fs.existsSync(DEFFAULT_DIR)) {
      fs.mkdirSync(DEFFAULT_DIR);
    }
  }

  /**
   * Generates a styled logo using the program's name.
   * @private
   * @returns {string} - The styled logo.
   */
  _generateLogo() {
    const name = figlet.textSync(this._name, { font: "ANSI Shadow" });
    return chalk.red(name);
  }

  /**
   * Styles the program's description text.
   * @private
   * @param {string} description - The description to style.
   * @returns {string} - The styled description.
   */
  _styleDescription(description) {
    return chalk.bgWhiteBright(` ${description} `);
  }
}
