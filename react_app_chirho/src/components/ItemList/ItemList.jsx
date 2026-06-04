import Item from '../Item/Item';

function ItemList({ products }) {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ItemList;
