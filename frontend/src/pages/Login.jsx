import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userAPI.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to ShopNow</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p style={{textAlign:'center', marginTop:'1rem'}}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f5f5f5' },
  card: { background:'#fff', padding:'2rem', borderRadius:'8px', width:'360px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
  title: { textAlign:'center', marginBottom:'1.5rem', color:'#1a1a2e' },
  input: { width:'100%', padding:'0.75rem', marginBottom:'1rem', border:'1px solid #ddd', borderRadius:'4px', boxSizing:'border-box' },
  btn: { width:'100%', padding:'0.75rem', background:'#e94560', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'1rem' },
  error: { color:'red', textAlign:'center', marginBottom:'1rem' }
};