import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/cartContextValue';

function ItemDetail({ product }) {
  const { addItem } = useContext(CartContext);
  const [agregado, setAgregado] = useState(false);

  function handleAgregar(cantidad) {
    addItem(product, cantidad);
    setAgregado(true);
  }

  return (
    <article className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="product-detail-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
        {agregado ? (
          <div className="detail-actions">
            <p className="status-message success">Producto agregado al carrito.</p>
            <Link className="primary-button" to="/cart">
              Terminar compra
            </Link>
            <Link className="secondary-button" to="/">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <ItemCount stock={product.stock} onAdd={handleAgregar} />
        )}
      </div>
    </article>
  );
}

export default ItemDetail;
