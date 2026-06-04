import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { createOrder } from '../../services/firestore';

const initialBuyer = {
  name: '',
  phone: '',
  email: '',
};

function CheckoutForm() {
  const { cart, clearCart, totalPrice } = useCart();
  const [buyer, setBuyer] = useState(initialBuyer);
  const [orderId, setOrderId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0 && !orderId) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setBuyer((currentBuyer) => ({
      ...currentBuyer,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    try {
      const generatedOrderId = await createOrder(order);
      setOrderId(generatedOrderId);
      clearCart();
      setBuyer(initialBuyer);
    } catch {
      setError('No se pudo generar la orden. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <main className="page empty-state">
        <h1>Compra confirmada</h1>
        <p>Tu numero de orden es:</p>
        <strong className="order-id">{orderId}</strong>
        <Link className="primary-button" to="/">
          Volver al catalogo
        </Link>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <section className="page-heading">
        <p>Datos del comprador</p>
        <h1>Checkout</h1>
      </section>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            required
            minLength="3"
          />
        </label>
        <label>
          Telefono
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            required
            minLength="8"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            required
          />
        </label>
        {error ? <p className="status-message error">{error}</p> : null}
        <div className="checkout-total">
          <span>Total a pagar</span>
          <strong>${totalPrice.toLocaleString('es-GT')}</strong>
        </div>
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Generando orden...' : 'Confirmar compra'}
        </button>
      </form>
    </main>
  );
}

export default CheckoutForm;
