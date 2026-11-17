import { readFile } from "node:fs/promises";
import path from "node:path";

// La carpeta data/ está en la raíz del proyecto.
// Desde src/utils (con tsx) o dist/utils (compilado) hay que subir dos niveles.
const dataDirectory = path.join(import.meta.dirname, "..", "..", "data");

export async function readJsonFile<T>(fileName: string): Promise<T> {
  const filePath = path.join(dataDirectory, fileName);
  const fileContent = await readFile(filePath, { encoding: "utf8" });
  return JSON.parse(fileContent) as T;
}
