import { useState } from 'react';

function ItemCount({ stock, initial = 1, onAdd }) {
  const [quantity, setQuantity] = useState(initial);
  const hasStock = stock > 0;

  function decrease() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increase() {
    setQuantity((currentQuantity) => Math.min(stock, currentQuantity + 1));
  }

  function handleSubmit() {
    if (!hasStock || quantity < 1 || quantity > stock) {
      return;
    }

    onAdd(quantity);
  }

  if (!hasStock) {
    return <p className="status-message">Producto sin stock.</p>;
  }

  return (
    <div className="item-count">
      <div className="counter-controls">
        <button type="button" onClick={decrease} disabled={quantity <= 1}>
          -
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={increase} disabled={quantity >= stock}>
          +
        </button>
      </div>
      <button className="primary-button" type="button" onClick={handleSubmit}>
        Agregar al carrito
      </button>
      <small>Stock disponible: {stock}</small>
    </div>
  );
}

export default ItemCount;
