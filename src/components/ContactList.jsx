import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsCollection = collection(db, "contacts");
      const snapshot = await getDocs(contactsCollection);
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
      setContacts(data);
      setFilteredContacts(data);
      setLoading(false);
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const filterResults = () => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
          contact.lastName.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredContacts(filtered);
    };
    filterResults();
  }, [searchTerm, contacts]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  if (contacts.length === 0) {
    return (
      <div className="container my-5">
        <h1 className="text-center mb-4 text-white contact-heading">Contact List</h1>
        <p className="text-center text-white">No contacts available.</p>
      </div>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <div className="container my-5">
        <h1 className="text-center mb-4 text-white contact-heading">Contact List</h1>
        <SearchBox onSearch={setSearchTerm} />
        <p className="text-center text-white">No matches found for "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 contact-heading">Contact List</h1>
      <SearchBox onSearch={setSearchTerm} />
      <div className="contactList-list-container">
        <ul className="contactList-contact-list">
          {filteredContacts.map((contact, index) => (
            <li
              className="contactList-contact-item fade-up"
              key={contact.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/contact/${contact.id}`} className="contactList-contact-link">
                <div className="contactList-contact-info">
                  <h5 className="contactList-contact-name text-white">
                    {contact.firstName} {contact.lastName}
                  </h5>
            
                </div>
              
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
