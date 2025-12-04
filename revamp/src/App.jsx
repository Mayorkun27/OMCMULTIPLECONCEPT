import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout";
import Home from "./pages/client/Home";
import Shop from "./pages/client/Shop";
import About from "./pages/client/About";
import Blog from "./pages/client/Blog";
import Contact from "./pages/client/Contact";
import ProductDetails from "./pages/client/shopsubpages/ProductDetails";
import Cart from "./pages/client/shopsubpages/Cart";
import Checkout from "./pages/client/shopsubpages/Checkout";
import CheckoutSuccess from "./pages/client/shopsubpages/CheckoutSuccess";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Order from "./pages/client/shopsubpages/Order";
import ManageProduct from "./pages/admin/ManageProduct";
import ManageOrder from "./pages/admin/ManageOrder";
import AdminLayout from "./layout/AdminLayout";
import AddProduct from "./pages/admin/AddProduct";
import Subscribers from "./pages/admin/Subscribers";
import ManageContact from "./pages/admin/ManageContact";
import Colors from "./pages/client/Colors";

function App() {
  
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route 
          path="/"
          element={<MainLayout children={<Home />} />}
        />
        <Route 
          path="/login"
          element={<MainLayout children={<Login />} />}
        />
        <Route 
          path="/register"
          element={<MainLayout children={<Register />} />}
        />
        <Route 
          path="/shops"
          element={<MainLayout children={<Shop />} />}
        />
        <Route 
          path="/explore"
          element={<MainLayout children={<Colors />} />}
        />
        <Route 
          path="/myorders"
          element={<MainLayout children={<Order />} />}
        />
        <Route 
          path="/shops/:id"
          element={<MainLayout children={<ProductDetails />} />}
        />
        <Route 
          path="/aboutus"
          element={<MainLayout children={<About />} />}
        />
        <Route 
          path="/blog"
          element={<MainLayout children={<Blog />} />}
        />
        <Route 
          path="/cart"
          element={<MainLayout children={<Cart />} />}
        />
        <Route 
          path="/checkout"
          element={<MainLayout children={<Checkout />} />}
        />
        <Route 
          path="/checkout/confirmation"
          element={<CheckoutSuccess />}
        />
        <Route 
          path="/contactus"
          element={<MainLayout children={<Contact />} />}
        />
        <Route 
          path="/admin/addproducts"
          element={<AdminLayout children={<AddProduct />} pageName="Add Products" />}
        />
        <Route 
          path="/admin/manageproducts"
          element={<AdminLayout children={<ManageProduct />} pageName="Manage Products" />}
        />
        <Route 
          path="/admin/manageorders"
          element={<AdminLayout children={<ManageOrder />} pageName="Manage Orders" />}
        />
        <Route 
          path="/admin/subscribers"
          element={<AdminLayout children={<Subscribers />} pageName="Manage Orders" />}
        />
        <Route 
          path="/admin/contact"
          element={<AdminLayout children={<ManageContact />} pageName="Manage Contact" />}
        />
      </Routes>
    </>
  )
}

export default App
