const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware - must be first
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

function createTables() {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    address_details TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin_code TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id)
  )`);
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/customers', (req, res) => {
  const { page = 1, limit = 10, search = '', city = '', state = '', pin_code = '', sortBy = 'created_at', sortOrder = 'DESC' } = req.query;
  
  let query = 'SELECT * FROM customers WHERE 1=1';
  let params = [];
  
  // Add search filters
  if (search) {
    query += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone_number LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }
  
  // Add sorting
  query += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  // Get total count
  db.get('SELECT COUNT(*) as total FROM customers', (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    
    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    db.all(query, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          data: rows,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: parseInt(limit)
          }
        });
      }
    });
  });
});

app.post('/api/customers', (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  db.run(
    'INSERT INTO customers (first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?)',
    [first_name, last_name, phone_number, email],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, first_name, last_name, phone_number, email });
      }
    }
  );
});

app.get('/api/customers/:id', (req, res) => {
  db.get('SELECT * FROM customers WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(row);
    }
  });
});

app.put('/api/customers/:id', (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  db.run(
    'UPDATE customers SET first_name = ?, last_name = ?, phone_number = ?, email = ? WHERE id = ?',
    [first_name, last_name, phone_number, email, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.json({ id: req.params.id, first_name, last_name, phone_number, email });
      }
    }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  db.run('DELETE FROM customers WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json({ message: 'Customer deleted successfully' });
    }
  });
});

// Address endpoints
app.get('/api/customers/:id/addresses', (req, res) => {
  db.all('SELECT * FROM addresses WHERE customer_id = ?', [req.params.id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/customers/:id/addresses', (req, res) => {
  const { address_details, city, state, pin_code, is_primary } = req.body;
  db.run(
    'INSERT INTO addresses (customer_id, address_details, city, state, pin_code, is_primary) VALUES (?, ?, ?, ?, ?, ?)',
    [req.params.id, address_details, city, state, pin_code, is_primary ? 1 : 0],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ 
          id: this.lastID, 
          customer_id: req.params.id, 
          address_details, 
          city, 
          state, 
          pin_code, 
          is_primary 
        });
      }
    }
  );
});

app.put('/api/customers/addresses/:addressId', (req, res) => {
  const { address_details, city, state, pin_code, is_primary } = req.body;
  db.run(
    'UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ?, is_primary = ? WHERE id = ?',
    [address_details, city, state, pin_code, is_primary ? 1 : 0, req.params.addressId],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Address not found' });
      } else {
        res.json({ 
          id: req.params.addressId, 
          address_details, 
          city, 
          state, 
          pin_code, 
          is_primary 
        });
      }
    }
  );
});

app.delete('/api/customers/addresses/:addressId', (req, res) => {
  db.run('DELETE FROM addresses WHERE id = ?', [req.params.addressId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Address not found' });
    } else {
      res.json({ message: 'Address deleted successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
