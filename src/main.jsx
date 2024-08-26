import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCategoriesPage from "./pages/categories/createCategories.jsx";
import CategoriesPage from "./pages/categories/categories.jsx";
import ProductsPage from "./pages/products/products.jsx";
import CreateProductsPage from "./pages/products/createProducts.jsx";
import LoginPage from "./pages/auth/login.jsx";
import OrdersPage from "./pages/orders/orders.jsx";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Stylist from "./pages/Stylist/Stylist.jsx";
import StylistCreate from "./pages/Stylist/StylistCreate.jsx";

const router = createBrowserRouter([
  {
    path: "/products",
    element: (
      <RequireAuth fallbackPath="/">
        <ProductsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/create-products",
    element: (
      <RequireAuth fallbackPath="/">
        <CreateProductsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/products/edit/:id",
    element: (
      <RequireAuth fallbackPath="/">
        <CreateProductsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/categories",
    element: (
      <RequireAuth fallbackPath="/">
        <CategoriesPage />
      </RequireAuth>
    ),
  },
  {
    path: "/categories/edit/:id",
    element: (
      <RequireAuth fallbackPath="/">
        <CreateCategoriesPage />
      </RequireAuth>
    ),
  },
  {
    path: "/create-categories",
    element: (
      <RequireAuth fallbackPath="/">
        <CreateCategoriesPage />
      </RequireAuth>
    ),
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/orders",
    element: (
      <RequireAuth fallbackPath="/">
        <OrdersPage />
      </RequireAuth>
    ),
  },
  {
    path: "/stylist",
    element: <Stylist />,
  },
  {
    path: "/create-stylist",
    element: <StylistCreate />,
  },
]);

const auth_store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider store={auth_store}>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
