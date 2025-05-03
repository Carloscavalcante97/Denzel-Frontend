import fs from "fs";
import path from "path";
import { globby } from "globby"; // ✅ forma correta


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "public");


const getPublicFilesMap = () => {
  const files = fs.readdirSync(publicDir, { withFileTypes: true });
  const map = new Map();

  for (const file of files) {
    if (file.isFile()) {
      map.set(file.name.toLowerCase(), file.name); // chave minúscula, valor original
    }
  }

  return map;
};

const corrigirImports = async () => {
  const files = await globby(["**/*.tsx", "!node_modules"]);
  const publicFilesMap = getPublicFilesMap();

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, "utf-8");
    let atualizado = false;

    const regex = /from\s+["']@\/public\/([^"']+)["']/g;
    content = content.replace(regex, (match, p1) => {
      const correto = publicFilesMap.get(p1.toLowerCase());
      if (correto && correto !== p1) {
        atualizado = true;
        console.log(`✔ Corrigido em ${filePath}: ${p1} -> ${correto}`);
        return match.replace(p1, correto);
      }
      return match;
    });

    if (atualizado) {
      fs.writeFileSync(filePath, content, "utf-8");
    }
  }

  console.log("✅ Correção concluída.");
};

corrigirImports();
