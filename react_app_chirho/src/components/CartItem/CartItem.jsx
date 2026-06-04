function CartItem({ item, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div>
        <h2>{item.name}</h2>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio unitario: ${item.price}</p>
      </div>
      <strong>${subtotal}</strong>
      <button onClick={() => onRemove(item.id)}>Eliminar</button>
    </div>
  );
}

export default CartItem;
