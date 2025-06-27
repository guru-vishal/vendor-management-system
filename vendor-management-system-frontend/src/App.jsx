import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import VendorList from "./components/Vendors/VendorList";
import VendorForm from "./components/Vendors/VendorForm";
import EditVendor from "./components/Vendors/EditVendor";
import AuthSuccess from "./components/Auth/AuthSuccess";
import "./App.css";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <Routes>
      {/* ✅ Always render this so token gets saved */}
      <Route path="/auth/success" element={<AuthSuccess />} />

      {!user ? (
        <>
          {/* Login route for unauthenticated users */}
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/vendors" replace />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendors/new" element={<VendorForm />} />
            <Route path="/vendors/edit/:id" element={<EditVendor />} />
            <Route path="*" element={<Navigate to="/vendors" replace />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
