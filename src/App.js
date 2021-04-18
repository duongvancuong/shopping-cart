import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';

import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import { ProductProvider } from "./hooks/product-context";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            component={Products}
          />
          <Route
            path="/shopping-cart"
            exact
            component={ShoppingCart}
          />
          <Route
            path="/products/:id"
            component={ProductDetail}
          />
        </Switch>
      </Router>
    </ProductProvider>
  );
}

export default App;
