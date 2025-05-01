import fs from 'fs';
import { exec } from 'child_process';
import chalk from 'chalk';
import { RepositoriesController } from '../utils/repositoriesController.js';
import { DEFFAULT_DIR } from '../utils/contants.js';

jest.mock('fs');
jest.mock('child_process');
jest.mock('chalk', () => ({
  yellow: jest.fn((msg) => msg),
  bgYellowBright: jest.fn((msg) => msg),
  bgGrey: jest.fn((msg) => msg),
  bgWhiteBright: jest.fn((msg) => msg),
}));

describe('RepositoriesController', () => {
  let controller;

  beforeEach(() => {
    controller = new RepositoriesController();
    controller.directoryPath = DEFFAULT_DIR;
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('getRepositories should return list of files', () => {
    fs.readdirSync.mockReturnValue(['file1.npmrc', 'file2.npmrc']);
    const result = controller.getRepositories();
    expect(result).toEqual(['file1.npmrc', 'file2.npmrc']);
    expect(fs.readdirSync).toHaveBeenCalledWith(DEFFAULT_DIR);
  });

  test('getRepositories should handle errors', () => {
    fs.readdirSync.mockImplementation(() => {
      throw new Error('Error reading directory');
    });
    const result = controller.getRepositories();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error reading directory:', expect.any(Error));
  });

  test('openRepository should execute VS Code command', () => {
    exec.mockImplementation((cmd, callback) => callback(null));
    controller.openRepository('file1.npmrc');
    expect(exec).toHaveBeenCalledWith(`code ${DEFFAULT_DIR}/file1.npmrc`, expect.any(Function));
    expect(chalk.bgWhiteBright).toHaveBeenCalledWith(' Opened in VS Code:  file1.npmrc ');
  });

  test('openRepository should handle errors', () => {
    exec.mockImplementation((cmd, callback) => callback(new Error('Error opening file')));
    controller.openRepository('file1.npmrc');
    expect(console.error).toHaveBeenCalledWith('Error opening file: Error: Error opening file');
  });

  test('fileExists should return true if file exists', () => {
    fs.readdirSync.mockReturnValue(['file1.npmrc', 'file2.npmrc']);
    const result = controller.fileExists('file1');
    expect(result).toBe(true);
  });

  test('fileExists should return false if file does not exist', () => {
    fs.readdirSync.mockReturnValue(['file1.npmrc', 'file2.npmrc']);
    const result = controller.fileExists('file3');
    expect(result).toBe(false);
  });

  test('selectRepository should return formatted file name if exists', () => {
    jest.spyOn(controller, 'fileExists').mockReturnValue(true);
    jest.spyOn(controller, 'formatFileName').mockReturnValue('file1.npmrc');
    const result = controller.selectRepository('file1');
    expect(result).toBe('file1.npmrc');
  });

  test('selectRepository should throw error if file does not exist', () => {
    jest.spyOn(controller, 'fileExists').mockReturnValue(false);
    jest.spyOn(controller, 'displayWarningMessage');
    expect(() => controller.selectRepository('file3')).toThrow('The file file3.npmrc doesn\'t exist.');
    expect(controller.displayWarningMessage).toHaveBeenCalledWith('file3');
  });

  test('formatFileName should append .npmrc if not present', () => {
    const result = controller.formatFileName('file1');
    expect(result).toBe('file1.npmrc');
  });

  test('formatFileName should return file name as is if .npmrc is present', () => {
    const result = controller.formatFileName('file1.npmrc');
    expect(result).toBe('file1.npmrc');
  });

  test('displayWarningMessage should log warning messages', () => {
    controller.displayWarningMessage('file3');
    expect(chalk.yellow).toHaveBeenCalledWith('⚠️ Warning: Command failed.');
    expect(chalk.bgYellowBright).toHaveBeenCalledWith(' The file file3.npmrc doesn\'t exist. ');
  });
});
