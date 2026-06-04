import NavBar from './components/NavBar/NavBar';
import { CartProvider } from './context/CartProvider';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <CartProvider>
      <NavBar />
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
