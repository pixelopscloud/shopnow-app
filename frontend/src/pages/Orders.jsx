import { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.id) {
      orderAPI.get(`/api/orders/user/${user.id}`)
        .then(res => setOrders(res.data))
        .catch(console.error);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>My Orders</h2>
        {orders.length === 0 ? <p>No orders yet</p> : orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.row}>
              <span>Order #{order.id}</span>
              <span style={{...styles.status, background: order.status === 'pending' ? '#ffa500' : '#4caf50'}}>{order.status}</span>
            </div>
            <p>Total: ${order.total_amount}</p>
            <p style={styles.date}>{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding:'2rem', maxWidth:'600px', margin:'0 auto' },
  card: { background:'#fff', padding:'1rem', borderRadius:'8px', marginBottom:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  row: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' },
  status: { padding:'0.25rem 0.75rem', borderRadius:'12px', color:'#fff', fontSize:'0.85rem' },
  date: { color:'#888', fontSize:'0.85rem', margin:0 }
};