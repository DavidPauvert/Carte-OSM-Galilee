import { Database } from "bun:sqlite";
import { schools } from "../src/data/schools";
import { markers } from "../src/data/markers";

// Initialisation de la base de données SQLite (crée le fichier s'il n'existe pas)
const db = new Database("data.db", { create: true });

// Création de la table 'schools' si elle n'existe pas déjà
db.run(`
  CREATE TABLE IF NOT EXISTS schools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    popup TEXT
  )
`);

console.log("Base de données initialisée.");

// Fusion des données provenant des fichiers de données statiques (schools.ts et markers.ts)
const mergedData = schools.map(school => {
  const marker = markers.find(m => m.id === school.id);
  return {
    ...school,
    latitude: marker ? marker.position[0] : 0,
    longitude: marker ? marker.position[1] : 0,
    popup: marker ? marker.popup : school.name
  };
});

// Préparation de la requête d'insertion
const insert = db.prepare(`
  INSERT OR REPLACE INTO schools (id, name, url, latitude, longitude, popup)
  VALUES ($id, $name, $url, $latitude, $longitude, $popup)
`);

// Exécution de l'insertion dans une transaction pour plus de performance
const insertTransaction = db.transaction((data) => {
  for (const item of data) {
    insert.run({
      $id: item.id,
      $name: item.name,
      $url: item.url,
      $latitude: item.latitude,
      $longitude: item.longitude,
      $popup: item.popup
    });
  }
  return data.length;
});

const count = insertTransaction(mergedData);
console.log(`Importation réussie de ${count} écoles dans la base de données.`);

db.close();
