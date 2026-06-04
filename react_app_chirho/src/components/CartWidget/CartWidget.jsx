import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContextValue';

function CartWidget() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link className="cart-widget" to="/cart">
      <span>🛒</span>
      {totalQuantity > 0 && <strong>{totalQuantity}</strong>}
    </Link>
  );
}

export default CartWidget;
