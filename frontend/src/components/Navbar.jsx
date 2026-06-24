import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>ShopNow v2.0</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
        {token
          ? <button onClick={logout} style={styles.btn}>Logout</button>
          : <Link to="/login" style={styles.link}>Login</Link>
        }
      </div>
    </nav>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 2rem', background:'#1a1a2e', color:'#fff' },
  brand: { color:'#e94560', fontWeight:'bold', fontSize:'1.5rem', textDecoration:'none' },
  links: { display:'flex', gap:'1.5rem', alignItems:'center' },
  link: { color:'#fff', textDecoration:'none' },
  btn: { background:'#e94560', color:'#fff', border:'none', padding:'0.5rem 1rem', borderRadius:'4px', cursor:'pointer' }
};