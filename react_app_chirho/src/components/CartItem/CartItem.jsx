function CartItem({ item, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div>
        <h2>{item.name}</h2>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio unitario: ${item.price.toLocaleString('es-GT')}</p>
      </div>
      <strong>${subtotal.toLocaleString('es-GT')}</strong>
      <button type="button" onClick={() => onRemove(item.id)}>
        Eliminar
      </button>
    </article>
  );
}

export default CartItem;
