import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="main-content">
          <div className="container">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
