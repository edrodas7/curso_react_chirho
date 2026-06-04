import { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../hooks/useCart';

function ItemDetail({ product }) {
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(isInCart(product.id));

  function handleAdd(quantity) {
    addItem(product, quantity);
    setAdded(true);
  }

  return (
    <article className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="product-detail-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong>${product.price.toLocaleString('es-GT')}</strong>
        {added ? (
          <div className="detail-actions">
            <p className="status-message success">
              El producto fue agregado al carrito.
            </p>
            <Link className="primary-button" to="/cart">
              Terminar compra
            </Link>
            <Link className="secondary-button" to="/">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <ItemCount stock={product.stock} onAdd={handleAdd} />
        )}
      </div>
    </article>
  );
}

export default ItemDetail;
