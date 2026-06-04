import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { getProducts } from '../../services/firestore';
import { mockProducts } from '../../data/mockProducts';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [state, setState] = useState({
    categoryId: null,
    products: [],
    error: '',
  });
  const currentCategory = categoryId ?? 'all';
  const loading = state.categoryId !== currentCategory;

  useEffect(() => {
    let ignore = false;
    const timeoutId = setTimeout(() => {
      if (!ignore) {
        setState({
          categoryId: currentCategory,
          products: getFallbackProducts(categoryId),
          error:
            'Firestore esta tardando demasiado en responder. Mostrando productos de prueba.',
        });
      }
    }, 8000);

    getProducts(categoryId)
      .then((firebaseProducts) => {
        if (!ignore) {
          clearTimeout(timeoutId);
          setState({
            categoryId: currentCategory,
            products: firebaseProducts,
            error: '',
          });
        }
      })
      .catch(() => {
        if (!ignore) {
          clearTimeout(timeoutId);
          setState({
            categoryId: currentCategory,
            products: getFallbackProducts(categoryId),
            error:
              'No se pudieron cargar los productos desde Firestore. Mostrando productos de prueba.',
          });
        }
      });

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [categoryId, currentCategory]);

  if (loading) {
    return <p className="status-message">Cargando productos...</p>;
  }

  if (state.error && state.products.length === 0) {
    return <p className="status-message error">{state.error}</p>;
  }

  return (
    <main className="page">
      <section className="page-heading">
        <p>Tienda online</p>
        <h1>{categoryId ? `Categoria: ${categoryId}` : 'Catalogo'}</h1>
      </section>
      {state.error ? (
        <p className="status-message error">{state.error}</p>
      ) : null}
      {state.products.length > 0 ? (
        <ItemList products={state.products} />
      ) : (
        <p className="status-message">
          No hay productos disponibles en esta categoria.
        </p>
      )}
    </main>
  );
}

function getFallbackProducts(categoryId) {
  if (!categoryId) {
    return mockProducts;
  }

  return mockProducts.filter((product) => product.category === categoryId);
}

export default ItemListContainer;
