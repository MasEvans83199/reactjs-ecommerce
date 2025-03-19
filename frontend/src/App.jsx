import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Column } from './components/Column';
import { Row } from './components/Row';
import { ProductCard } from './components/ProductCard';
import { SiteHeader } from './components/SiteHeader';
import { sampleProductsList } from './assets/sampleProducts';
import { ViewOrders } from './pages/ViewOrders';
import { CheckOut } from './pages/CheckOut';
import { Main } from './pages/Main';


function App() {


  return (
    <Router>
      <Column>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/orders" element={<ViewOrders />} />
          <Route path="/check-out" element={<CheckOut />} />
        </Routes>
      </Column>
    </Router>
  )
}

export default App
