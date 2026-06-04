import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getProductById } from '../../services/firestore';
import { mockProducts } from '../../data/mockProducts';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [state, setState] = useState({
    itemId: null,
    product: null,
    error: '',
  });
  const loading = state.itemId !== itemId;

  useEffect(() => {
    let ignore = false;
    const timeoutId = setTimeout(() => {
      if (!ignore) {
        setState({
          itemId,
          product: getFallbackProduct(itemId),
          error:
            'Firestore esta tardando demasiado en responder. Mostrando producto de prueba si existe.',
        });
      }
    }, 8000);

    getProductById(itemId)
      .then((firebaseProduct) => {
        if (!ignore) {
          clearTimeout(timeoutId);
          setState({
            itemId,
            product: firebaseProduct,
            error: '',
          });
        }
      })
      .catch(() => {
        if (!ignore) {
          clearTimeout(timeoutId);
          setState({
            itemId,
            product: getFallbackProduct(itemId),
            error:
              'No se pudo cargar el detalle desde Firestore. Mostrando producto de prueba si existe.',
          });
        }
      });

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [itemId]);

  if (loading) {
    return <p className="status-message">Cargando detalle...</p>;
  }

  if (state.error && !state.product) {
    return <p className="status-message error">{state.error}</p>;
  }

  if (!state.product) {
    return (
      <main className="page">
        <p className="status-message">Producto no encontrado.</p>
        <Link className="secondary-button" to="/">
          Volver al catalogo
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      {state.error ? (
        <p className="status-message error">{state.error}</p>
      ) : null}
      <ItemDetail product={state.product} />
    </main>
  );
}

function getFallbackProduct(itemId) {
  return mockProducts.find((product) => product.id === itemId) ?? null;
}

export default ItemDetailContainer;
