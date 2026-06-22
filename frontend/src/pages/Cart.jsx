import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI, paymentAPI } from '../services/api';
import Navbar from '../components/Navbar';

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const removeItem = (id) => {
    const updated = cart.filter(i => i.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const checkout = async () => {
    if (!user.id) return navigate('/login');
    try {
      const order = await orderAPI.post('/api/orders', {
        user_id: user.id,
        items: cart,
        total_amount: total
      });
      await paymentAPI.post('/api/payments', {
        order_id: order.data.id,
        user_id: user.id,
        amount: total,
        payment_method: 'card'
      });
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert('Checkout failed!');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <>
            {cart.map(item => (
              <div key={item.id} style={styles.item}>
                <span>{item.name}</span>
                <span>Qty: {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
                <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
            <div style={styles.total}>Total: ${total.toFixed(2)}</div>
            <button style={styles.btn} onClick={checkout}>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding:'2rem', maxWidth:'600px', margin:'0 auto' },
  item: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', background:'#fff', borderRadius:'4px', marginBottom:'0.5rem', boxShadow:'0 1px 4px rgba(0,0,0,0.1)' },
  removeBtn: { background:'#ff4444', color:'#fff', border:'none', padding:'0.3rem 0.6rem', borderRadius:'4px', cursor:'pointer' },
  total: { textAlign:'right', fontSize:'1.2rem', fontWeight:'bold', margin:'1rem 0' },
  btn: { width:'100%', padding:'0.75rem', background:'#e94560', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'1rem' }
};