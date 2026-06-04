import { Link } from 'react-router-dom';

function Item({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <strong>${product.price.toLocaleString('es-GT')}</strong>
          <Link to={`/item/${product.id}`}>Ver detalle</Link>
        </div>
      </div>
    </article>
  );
}

export default Item;
