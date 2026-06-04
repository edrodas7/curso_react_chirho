import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { useCart } from '../../hooks/useCart';

function Cart() {
  const { cart, clearCart, removeItem, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="page empty-state">
        <h1>Carrito vacio</h1>
        <p>Agrega productos desde el catalogo para iniciar una compra.</p>
        <Link className="primary-button" to="/">
          Ver catalogo
        </Link>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <section className="page-heading">
        <p>Resumen</p>
        <h1>Carrito</h1>
      </section>
      <section className="cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeItem} />
        ))}
      </section>
      <section className="cart-summary">
        <button className="secondary-button" type="button" onClick={clearCart}>
          Vaciar carrito
        </button>
        <div>
          <span>Total</span>
          <strong>${totalPrice.toLocaleString('es-GT')}</strong>
        </div>
        <Link className="primary-button" to="/checkout">
          Ir al checkout
        </Link>
      </section>
    </main>
  );
}

export default Cart;
