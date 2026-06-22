import { useState, useEffect } from 'react';
import { productAPI, orderAPI } from '../services/api';
import Navbar from '../components/Navbar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    productAPI.get('/api/products').then(res => setProducts(res.data)).catch(console.error);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    const updated = existing
      ? cart.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i)
      : [...cart, {...product, qty: 1}];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    alert('Added to cart!');
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <input style={styles.search} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <div style={styles.grid}>
          {filtered.map(product => (
            <div key={product.id} style={styles.card}>
              <img src={product.image_url || 'https://via.placeholder.com/200'} alt={product.name} style={styles.img} />
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.price}>${product.price}</p>
              <p style={styles.stock}>Stock: {product.stock}</p>
              <button style={styles.btn} onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding:'2rem' },
  search: { width:'100%', padding:'0.75rem', marginBottom:'2rem', border:'1px solid #ddd', borderRadius:'4px', fontSize:'1rem', boxSizing:'border-box' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'1.5rem' },
  card: { background:'#fff', borderRadius:'8px', padding:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  img: { width:'100%', height:'160px', objectFit:'cover', borderRadius:'4px' },
  name: { margin:'0.5rem 0', color:'#1a1a2e' },
  price: { color:'#e94560', fontWeight:'bold', fontSize:'1.1rem' },
  stock: { color:'#888', fontSize:'0.85rem' },
  btn: { width:'100%', padding:'0.5rem', background:'#e94560', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', marginTop:'0.5rem' }
};