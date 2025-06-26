import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import VendorList from "./components/Vendors/VendorList";
import VendorForm from "./components/Vendors/VendorForm";
import EditVendor from "./components/Vendors/EditVendor";
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

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/vendors" replace />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/vendors/new" element={<VendorForm />} />
          <Route path="/vendors/edit/:id" element={<EditVendor />} />
          <Route path="*" element={<Navigate to="/vendors" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
