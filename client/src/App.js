import "./App.css";
import {Routes,Route} from 'react-router-dom';
import Homepage from "./page/Homepage";
import Contact from "./page/Contact";
import About from "./page/About";
import Policy from "./page/Policy";
import PagenotFound from "./page/PagenotFound";
import Register from "./page/Auth/Register";

  import 'react-toastify/dist/ReactToastify.css';
import Login from "./page/Auth/Login";
import Dashboard from "./page/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgotPassword from "./page/Auth/ForgotPassword";
import Adminroute from "./components/Routes/Adminroute";
import AdminDashboard from "./page/Admin/AdminDashboard";
import CreateCategory from "./page/Admin/CreateCategory";
import CreateProduct from "./page/Admin/CreateProduct";
import Users from "./page/Admin/Users";
import Orders from "./page/user/Orders";
import Profile from "./page/user/Profile";
import Products from "./page/Admin/Products";
import UpdateProduct from "./page/Admin/UpdateProduct";

function App() {
  return (
    <div className="App">
         <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/dashboard' element={<Private/>}>
            <Route path="user" element={<Dashboard/>}/>
            <Route path="user/orders" element={<Orders/>}/>
            <Route path="user/Profile" element={<Profile/>}/>
          </Route>
          <Route path='/dashboard' element={<Adminroute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
            <Route path="admin/create-category" element={<CreateCategory/>}/>
            <Route path="admin/create-product" element={<CreateProduct/>}/>
            <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
            <Route path="admin/get-product" element={<Products/>}/>
            <Route path="admin/users" element={<Users/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/policy" element={<Policy/>}/>
          <Route path="/*"  element={<PagenotFound/>}/>
         </Routes>
         
    </div>
  );
}

export default App;
