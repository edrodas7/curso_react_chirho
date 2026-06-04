import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { getProducts } from '../../services/firestore';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId)
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <p className="status-message">Cargando productos...</p>;
  }

  return (
    <main className="page">
      <section className="page-heading">
        <p>Tienda online</p>
        <h1>{categoryId ? `Categoria: ${categoryId}` : 'Catalogo'}</h1>
      </section>
      {products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <p className="status-message">No hay productos disponibles.</p>
      )}
    </main>
  );
}

export default ItemListContainer;
