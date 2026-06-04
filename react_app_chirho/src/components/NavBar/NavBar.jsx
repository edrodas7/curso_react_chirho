import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { getCategories } from '../../services/firestore';

const defaultCategories = ['notebooks', 'accesorios', 'monitores'];

function NavBar() {
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    getCategories()
      .then((firebaseCategories) => {
        if (firebaseCategories.length > 0) {
          setCategories(firebaseCategories);
        }
      })
      .catch(() => {
        setCategories(defaultCategories);
      });
  }, []);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        Chirho Tech
      </Link>
      <nav className="nav-links" aria-label="Navegacion principal">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Catalogo
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category}
            to={`/category/${category}`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {category}
          </NavLink>
        ))}
      </nav>
      <CartWidget />
    </header>
  );
}

export default NavBar;
