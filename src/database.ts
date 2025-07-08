import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(':memory:');

export const initDatabase = () => {
  db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT)');
    db.run('INSERT INTO users (username, password, role) VALUES ("admin", "admin", "admin")');
  });
};