import { useState } from 'react';

function ItemCount({ stock, onAdd }) {
  const [cantidad, setCantidad] = useState(1);

  function restar() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  function sumar() {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  }

  function agregar() {
    if (stock > 0 && cantidad >= 1 && cantidad <= stock) {
      onAdd(cantidad);
    }
  }

  if (stock === 0) {
    return <p className="status-message">Producto sin stock.</p>;
  }

  return (
    <div className="item-count">
      <div className="counter-controls">
        <button onClick={restar}>-</button>
        <span>{cantidad}</span>
        <button onClick={sumar}>+</button>
      </div>
      <button className="primary-button" onClick={agregar}>
        Agregar al carrito
      </button>
      <small>Stock disponible: {stock}</small>
    </div>
  );
}

export default ItemCount;
