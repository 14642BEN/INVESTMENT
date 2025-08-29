import { useState, useEffect } from 'react';
import axios from 'axios';

const packages = [
  { name: 'Bronze', amount: 100 },
  { name: 'Silver', amount: 500 },
  { name: 'Gold', amount: 1000 },
];

function App() {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if token exists
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      alert('Login failed');
    }
  };

  const invest = async () => {
    if (!selected) return alert('Choose a package');
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/invest',
        {
          packageType: selected,
          amount: packages.find((p) => p.name === selected).amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Investment successful!');
    } catch (err) {
      alert('Failed to invest');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {!user ? (
        <div>
          <h2>Login</h2>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <br />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.username}</h2>
          <button onClick={logout}>Logout</button>
          <h3>Select Investment Package:</h3>
          {packages.map((p) => (
            <div key={p.name}>
              <input
                type="radio"
                name="package"
                value={p.name}
                onChange={() => setSelected(p.name)}
              />
              {p.name} - ${p.amount}
            </div>
          ))}
          <button onClick={invest}>Invest</button>
        </div>
      )}
    </div>
  );
}

export default App;
