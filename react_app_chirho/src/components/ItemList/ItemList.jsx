import Item from '../Item/Item';

function ItemList({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ItemList;
