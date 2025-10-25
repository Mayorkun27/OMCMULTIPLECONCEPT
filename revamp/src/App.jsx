import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout";
import Home from "./pages/client/Home";
import Shop from "./pages/client/Shop";
import About from "./pages/client/About";
import Blog from "./pages/client/Blog";

function App() {
  
  return (
    <>
      <Toaster />
      <Routes>
        <Route 
          path="/"
          element={<MainLayout children={<Home />} />}
        />
        <Route 
          path="/shop"
          element={<MainLayout children={<Shop />} />}
        />
        <Route 
          path="/aboutus"
          element={<MainLayout children={<About />} />}
        />
        <Route 
          path="/blog"
          element={<MainLayout children={<Blog />} />}
        />
      </Routes>
    </>
  )
}

export default App
