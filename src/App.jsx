import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import AddContactForm from "./components/AddContactForm";
import EditContactForm from "./components/EditContactForm";
import Navbar from "./components/Navbar";  
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
    
      <Navbar />
      <div className="container" style={{ marginTop: '80px' }}> 
        <Routes>
          <Route path="/" element={<ContactList searchTerm={searchTerm} />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/add" element={<AddContactForm />} />
          <Route path="/edit/:id" element={<EditContactForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
