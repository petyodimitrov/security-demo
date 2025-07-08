import express from 'express';
import { initDatabase, db } from './database';
import { underTestRoutes } from './underTest';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDatabase();

app.use('/underTest', underTestRoutes);

app.get('/', (req, res) => {

  db.all('SELECT * FROM users', (err, users) => {
    if (err) {
      res.status(500).send('Error fetching users');
      return;
    }
  
    // Render the HTML with updated CSS for layout changes
    res.send(`
      <style>
        body {
          padding: 0 20px; /* Apply padding to the entire page */
          font-family: Arial, sans-serif;
        }
        .container {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .section {
          width: 48%;
        }
        .form-group {
          margin-bottom: 10px;
        }
        .login-signup-form, .comment-form {
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          padding: 10px;
        }
        .login-signup-form {
          display: flex;
          flex-direction: column;
        }
        .login-signup-form h3 {
          margin-top: 0;
        }
        .login-signup-form label {
          margin-bottom: 5px;
        }
        .login-signup-form input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .login-signup-form button {
          width: 100%;
          padding: 10px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .login-signup-form button:hover {
          background-color: #e0e0e0;
        }
        .comment-form {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        }
        .comment-form label {
          margin-bottom: 5px;
        }
        .comment-form textarea {
          width: 100%;
          height: 80px;
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
          box-sizing: border-box;
        }
        .comment-form button {
          width: 100%;
          padding: 10px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .comment-form button:hover {
          background-color: #e0e0e0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table, th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      </style>
      
      <h1>Injection Demo</h1>
      <div style="margin-top: 30px;">
        <h2>Current Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(user => `
              <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${user.role}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="container">
        <div class="section">
          <h2>Vulnerable Forms</h2>
          <form action="/underTest/login" method="POST" class="login-signup-form">
            <h3>Login</h3>
            <div class="form-group">
              <label>Username:</label>
              <input type="text" name="username" />
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="text" name="password" />
            </div>
            <button type="submit">Login</button>
          </form>
          <form action="/underTest/signup" method="POST" class="login-signup-form">
            <h3>Sign Up</h3>
            <div class="form-group">
              <label>Username:</label>
              <input type="text" name="username" />
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="text" name="password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <form action="/underTest/comment" method="POST" class="comment-form">
            <label>Comment:</label>
            <textarea name="comment"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    `);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});