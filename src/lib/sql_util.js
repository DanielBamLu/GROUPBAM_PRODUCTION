// package imports
const mysql = require('mysql2/promise');
require('dotenv').config();

// exporting MySQL connection pool object
module.exports = mysql.createPool({
    host: process.env.MYSQLHOST ?? 'localhost',
    port: process.env.MYSQLPORT ?? 3306,
    user: process.env.MYSQLUSER ?? 'root',
    password: process.env.MYSQLPASSWORD ?? '',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
})


Update: it works!

Async/await connection pooling seems to have done the trick. For the first time, my server has been running for a whole day now without throwing any errors. If anyone's still having any issues, I suggest following irepela's and MaksemM's examples. My current setup is described below.

First, I'm creating a connection pool with mysql2/promise and exporting it for reuse across different modules/files.

sql_util.js - creates connection pool:
// package imports
const mysql = require('mysql2/promise');
require('dotenv').config();

// exporting MySQL connection pool object
module.exports = mysql.createPool({
  host: 'localhost',
  user: 'lucca',
  password: process.env.MYSQL_PASSWORD,
  database: 'tank_battle',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
})
Then, in my routes/middleware/APIs/whatever, I'm just importing the pool object and running the queries on the pool object, just as you would with a regular MySQL connection object. In other words, I'm using await pool.query instead of await connection.execute or await connection.query.

api.js - internal app logic for handling API requests:
const { private } = require('../middleware/private');   // -> custom middleware for private routes
const pool = require('../sql_util');                    // -> creates connection pool (see above) 
const jwt = require("jsonwebtoken");                    // -> "jsonwebtoken" package from npm

// Express Router setup
const router = express.Router();
router.use(private);

// GET /user    --> returns user information
router.get('/user', async (req, res) => {

  const decoded = jwt.decode(req.token, {complete: true});
  const name = decoded.payload.username.toString();

  const sql = "select username, elo, lb_rank, tank_color from users where username=?"

  try {
    const [query_result, fields, err] = await pool.query(sql, [name]);

    if (query_result.length > 0) {

      const q = query_result[0]

      // BinaryRow {
      //   username: 'Lucca',
      //   elo: 1000,
      //   lb_rank: 1,
      //   tank_color: #12fca7
      // }

      const userData = {
        error: false,
        name: q.username,
        elo: q.elo,
        lb_rank: q.lb_rank,
        tank_color: q.tank_color
      }

      res.status(200);
      res.json(userData);
      return;

    } else {
      console.log('user not found');

      res.status(404);
      res.json({
        error: true,
        message: 'User not found'
      });

      return;
    }

  }

  catch (e) {
    res.status(500);
    res.json({
      error: true,
      message: 'Server Error'
    });
    console.log(e);
    return;
  }

});

module.exports = router;