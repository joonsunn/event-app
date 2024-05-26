import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import NotFound from "./pages/notFound/NotFound";
// import Main from "./pages/main/Main";
// import About from "./pages/about/About";
import Layout from "./layouts/Layout";
import Main from "./pages/main/Main";
import Admin from "./pages/admin-portal/Admin";
import ProtectedRoute from "./layouts/ProtectedRoute";
import UnprotectedRoute from "./layouts/UnprotectedRoute";
// import ExpenseInput from "./pages/expense-input/ExpenseInput";

function Router() {
  return (
    <Routes>
      <Route
        // path="/"
        element={<Layout />}
      >
        <Route element={<UnprotectedRoute />}>
          <Route
            path="/"
            element={<Main />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Route>
      </Route>
      <Route
        path="/404"
        element={<NotFound />}
      />
      <Route
        path="*"
        element={<Navigate to="/404" />}
      />
    </Routes>
  );
}

export default Router;
