import React from "react";
import Home from "./pages/Home";
import "./styles/App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import InvoiceDetailsPage from "./components/InvoiceDetailsPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
