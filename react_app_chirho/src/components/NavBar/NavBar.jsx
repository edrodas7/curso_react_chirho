import { NavLink, Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const categorias = ['notebooks', 'accesorios', 'monitores'];

function NavBar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        Chirho Tech
      </Link>
      <nav className="nav-links">
        <NavLink to="/">Catalogo</NavLink>
        {categorias.map((cat) => (
          <NavLink key={cat} to={`/category/${cat}`}>
            {cat}
          </NavLink>
        ))}
      </nav>
      <CartWidget />
    </header>
  );
}

export default NavBar;
