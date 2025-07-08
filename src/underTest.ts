import { Router } from 'express';
import { db } from './database';

export const underTestRoutes = Router();

underTestRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.get(
    query,
    (err, user) => {
      if (err) {
        res.status(500).send('Error occurred');
      } else if (user) {
        res.send(`Welcome, ${user.username}. Your role is ${user.role}`);
      } else {
        res.send('Invalid credentials');
      }
    }
  );
});

underTestRoutes.post('/signup', (req, res) => {
  const { username, password } = req.body;
  
  const query = `INSERT INTO users (username, password, role) VALUES ('${username}', '${password}', 'user')`;
  db.run(query, 
    (err) => {
      if (err) {
        res.status(500).send('Error occurred while signing up');
      } else {
        res.redirect('/'); // Redirect back to the homepage
      }
    }
  );
});

underTestRoutes.post('/comment', (req, res) => {
  const { comment } = req.body;

  res.send(`Received comment: ${comment}`);
});
