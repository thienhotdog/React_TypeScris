import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./auth/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import WebsiteLayout from "./layouts/WebsiteLayout";
import AddCategory from "./pages/admin/category/add";
import EditCategory from "./pages/admin/category/edit";
import ListCategory from "./pages/admin/category/list";
import Addproduct from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";
import ListProduct from "./pages/admin/product/list";
import ListUser from "./pages/admin/user/list";
import ListOrder from "./pages/admin/order/list";
import ListOrderDelivered from "./pages/admin/order/listorderDelivered";
import ListOrderApproved from "./pages/admin/order/list_approved";
import OrderDetail from "./pages/admin/order/order_detail";
import UpdateOrder from "./pages/admin/order/update";
import ShopCart from "./pages/website/cart";
import CheckOut from "./pages/website/checkOut";
import ProductDetailPage from "./pages/website/product_detail";
import Shop from "./pages/website/shop";
import Signin from "./pages/website/signin";
import Signup from "./pages/website/signup";
import DetailUser from "./pages/website/user";
import UserLayout from "./layouts/UserLayout";
import UpdateUser from "./pages/website/userUpdate";


const Router: React.FC =() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/user" element={<UserLayout />}>
                    <Route path="/user/:id" element={<DetailUser />} />
                    <Route path="/user/:id/update" element={<UpdateUser />} />
                </Route>
                <Route>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Route>
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<Navigate to="shop" />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="product/:id" element={<ProductDetailPage />} />
                    <Route path="cart" element={<ShopCart />} />
                    <Route path="checkout" element={<CheckOut />} />
                </Route>
                <Route path="/admin/*" element={
                    <AdminRoute>
                         <AdminLayout />
                    </AdminRoute>
                }>
                    <Route index element={<Navigate to="category" />} />
                    <Route path="product" element={<ListProduct  />} /> 
                    <Route path="addcategory" element={<AddCategory />} />
                    <Route path="category" element={<ListCategory />} /> 
                    <Route path="addproduct" element={<Addproduct />} />   
                    <Route path="product/:id" element={<EditProduct />} />   
                    <Route path="category/:slug" element={<EditCategory />} />
                    <Route path="listorder" element={<ListOrder />} />
                    <Route path="order/:id" element={<UpdateOrder />} />
                    {/* <Route path="listorderapproved" element={<ListOrderApproved />} />
                    <Route path="listorderdelivered" element={<ListOrderDelivered />} /> */}
                    <Route path="order/:id" element={<OrderDetail />} />
                    <Route path="users" element={<ListUser />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;