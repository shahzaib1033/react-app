import SignIn from './components/signIn/SignIn';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from './components/homepage/Home';
import ProtectedRoute from './protected-route';
// import Product from './components/products/Products';
import Forgot from './components/forgotPassword/Forgot';
import ProductForm from './components/addproducts/addProducts';
import ResetPass from './components/reset/ResetPass';
import CategoryForm from './components/productCategories/Category';
import SubcategoryForm from './components/productCategories/Subcategory';
import Product from './components/products/Products';
import ProductUpdateForm from './components/UpdateProduct/UpdateProduct';
import UpdateSubcategory from './components/productCategories/Updatesubcategory';
import RegisterForm from './components/accounts/CreateAccounts';
import Accounts from './components/accounts/Accounts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/resetPassword/:token' element={<ResetPass />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path='/addproducts' element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        } />
        <Route path='/updateproducts/:id' element={
          <ProtectedRoute>
            <ProductUpdateForm />
          </ProtectedRoute>
        } />
        <Route path='/products' element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />

        <Route path='/accounts' element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        } />
        <Route path='/addaccounts' element={
          <ProtectedRoute>
            <RegisterForm />
          </ProtectedRoute>
        } />
        <Route path='/addcategory' element={
          <ProtectedRoute>
            <CategoryForm />
          </ProtectedRoute>
        } />
        <Route path='/addcategory/:id' element={
          <ProtectedRoute>
            <CategoryForm />
          </ProtectedRoute>
        } />
        <Route path='/addsubcategory' element={
          <ProtectedRoute>
            <SubcategoryForm />
          </ProtectedRoute>
        }
        />
        <Route path='/updateSubcategory/:id' element={
          <ProtectedRoute>
            <UpdateSubcategory />
          </ProtectedRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
