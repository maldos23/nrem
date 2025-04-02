# 🚀 NREM - Node Registry Easy Manager

NRM is a CLI tool to manage `.npmrc` files easily and efficiently. This README describes the available commands and how to use them.

## 📥 Installation

Clone this repository and run the following command to install dependencies:

```bash
npm install
```

## 🛠️ Usage

Run the program using the following command:

```bash
node index.js <command> [options]
```

## 📜 Commands

### ✨ `new`

Creates a new `.npmrc` file.

- **Usage**: 
  ```bash
  node index.js new <filename>
  ```
- **Arguments**:
  - `<filename>`: Name of the `.npmrc` file you want to create.
- **Description**: This command allows you to create a new `.npmrc` file with the specified name.

---

### 🔄 `use`

Switches between different `.npmrc` files.

- **Usage**: 
  ```bash
  node index.js use <filename> [options]
  ```
- **Arguments**:
  - `<filename>`: Name of the `.npmrc` file you want to switch to.
- **Options**:
  - `-i, --index <file-index>`: Index of the `.npmrc` file in the list.
- **Description**: This command allows you to quickly switch between different `.npmrc` configurations.

---

### ✏️ `edit`

Edits an existing `.npmrc` file.

- **Usage**: 
  ```bash
  node index.js edit <filename> [options]
  ```
- **Arguments**:
  - `<filename>`: Name of the `.npmrc` file you want to edit.
- **Options**:
  - `-i, --index <file-index>`: Index of the `.npmrc` file in the list.
- **Description**: This command opens an existing `.npmrc` file for editing.

---

### 🗑️ `delete`

Deletes an existing `.npmrc` file.

- **Usage**: 
  ```bash
  node index.js delete <filename> [options]
  ```
- **Arguments**:
  - `<filename>`: Name of the `.npmrc` file you want to delete.
- **Options**:
  - `-i, --index <file-index>`: Index of the `.npmrc` file in the list.
- **Description**: This command deletes an existing `.npmrc` file.

---

### 📋 `list`

Lists all available `.npmrc` files.

- **Usage**: 
  ```bash
  node index.js list
  ```
- **Description**: This command displays a list of all available `.npmrc` files in the default directory.

---

## 🤝 Contributions

If you want to contribute to this project, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
