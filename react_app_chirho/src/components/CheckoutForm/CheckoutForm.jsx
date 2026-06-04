import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContextValue';
import { createOrder } from '../../services/firestore';

function CheckoutForm() {
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const order = {
      buyer: { nombre, telefono, email },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    createOrder(order)
      .then((id) => {
        setOrderId(id);
        clearCart();
      })
      .catch((error) => {
        console.log(error);
      });
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

  if (cart.length === 0) {
    return (
      <main className="page empty-state">
        <h1>Carrito vacio</h1>
        <p>Agrega productos antes de continuar al checkout.</p>
        <Link className="primary-button" to="/">
          Ver catalogo
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Telefono
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="checkout-total">
          <span>Total a pagar</span>
          <strong>${totalPrice}</strong>
        </div>
        <button className="primary-button" type="submit">
          Confirmar compra
        </button>
      </form>
    </main>
  );
}

export default CheckoutForm;
