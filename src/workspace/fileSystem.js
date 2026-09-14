import fs from "node:fs/promises";
import path from "node:path";

const WEBSITE_WORKSPACE = path.resolve("generated-sites");

function safePath(relativePath) {
  const resolvedPath = path.resolve(WEBSITE_WORKSPACE, relativePath);

  // Prevent ../ from escaping generated-sites
  if (
    resolvedPath !== WEBSITE_WORKSPACE &&
    !resolvedPath.startsWith(`${WEBSITE_WORKSPACE}${path.sep}`)
  ) {
    throw new Error("Access outside generated-sites is not allowed");
  }

  return resolvedPath;
}

export async function createDirectory({ path: relativePath }) {
  try {
    const directoryPath = safePath(relativePath);

    await fs.mkdir(directoryPath, {
      recursive: true,
    });

    return `Directory created successfully: ${relativePath}`;
  } catch (error) {
    return `Failed to create directory: ${error.message}`;
  }
}

export async function writeFile({ path: relativePath, content }) {
  try {
    const filePath = safePath(relativePath);

    // Make sure parent directory exists
    await fs.mkdir(path.dirname(filePath), {
      recursive: true,
    });

    await fs.writeFile(filePath, content, "utf8");

    return `File written successfully: ${relativePath}`;
  } catch (error) {
    return `Failed to write file: ${error.message}`;
  }
}

export async function readFile({ path: relativePath }) {
  try {
    const filePath = safePath(relativePath);

    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    return `Failed to read file: ${error.message}`;
  }
}

export async function listFiles({ path: relativePath }) {
  try {
    const directoryPath = safePath(relativePath);

    try {
      await fs.access(directoryPath);
    } catch {
      return `Directory does not exist: ${relativePath}`;
    }

    const files = [];

    async function walk(currentDirectory) {
      const entries = await fs.readdir(currentDirectory, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        const fullPath = path.join(currentDirectory, entry.name);

        const relativePath = path.relative(WEBSITE_WORKSPACE, fullPath);

        files.push(relativePath);

        if (entry.isDirectory()) {
          await walk(fullPath);
        }
      }
    }

    await walk(directoryPath);

    return files.length ? files.join("\n") : "Directory is empty";
  } catch (error) {
    return `Failed to list files: ${error.message}`;
  }
}
