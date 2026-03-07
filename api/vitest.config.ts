import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // On désactive le parallélisme entre les fichiers
    fileParallelism: false,

    // On utilise le pool 'threads' (par défaut)
    pool: "threads",

    // C'est ICI que se cachent les options de workers en v3
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 1,
      },
    },

    // On s'assure que les tests dans un fichier ne sont pas lancés en même temps
    sequence: {
      concurrent: false,
    },
  },
});
