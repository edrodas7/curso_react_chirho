import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getProductById } from '../../services/firestore';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(itemId)
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <p className="status-message">Cargando detalle...</p>;
  }

  if (!product) {
    return <p className="status-message">Producto no encontrado.</p>;
  }

  return (
    <main className="page">
      <ItemDetail product={product} />
    </main>
  );
}

export default ItemDetailContainer;
