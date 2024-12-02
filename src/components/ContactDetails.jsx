import React, { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db";
import { useParams, Link, useNavigate } from "react-router-dom";
import './ContactDetails.css';

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setContact(snapshot.data());
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirmDelete) {
      setDeleting(true);
      try {
        const docRef = doc(db, "contacts", id);
        await deleteDoc(docRef);
        setDeleteStatus("Contact deleted successfully!");
        setTimeout(() => {
          setDeleteStatus("");
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error deleting contact: ", error);
        setDeleteStatus("Failed to delete contact. Please try again.");
        setTimeout(() => {
          setDeleteStatus("");
          setDeleting(false);
        }, 2000);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="container my-5">
        <h1 className="text-center">Contact not found</h1>
        <Link to="/" className="btn btn-secondary">Back to Contact List</Link>
      </div>
    );
  }

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Not Provided";
    return parsedDate.toLocaleDateString("en-GB");
  };

  return (
    <div className="contact-details-container">
      <div className="contact-details-card card shadow-lg p-5 mb-4">
        <h1 className="contactdetails--heading text-center mb-4">Contact Details</h1>
        <div className="contact-details-info">
          <div className="contact-details-grid p-4">
            <div className="contact-details-item text-white">
              <strong className="text-white">First Name:</strong> {contact.firstName || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Last Name:</strong> {contact.lastName || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Email:</strong> {contact.email || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Phone Number:</strong> {contact.phoneNumber || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Address:</strong> {contact.address || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">City:</strong> {contact.city || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">State:</strong> {contact.state || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Zip Code:</strong> {contact.zipCode || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Company:</strong> {contact.company || "N/A"}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Birthday:</strong> {formatDate(contact.birthday)}
            </div>
            <div className="contact-details-item text-white">
              <strong className="text-white">Notes:</strong> {contact.notes || "N/A"}
            </div>
          </div>
        </div>
        <div className="contact-details-actions text-center mt-4">
          <Link to={`/edit/${id}`} className="btn btn-primary mx-2">
            Edit Contact
          </Link>
          <button
            onClick={handleDelete}
            className={`btn btn-danger mx-2 ${deleting ? "loading" : ""}`}
            disabled={deleting}
          >
            {deleting ? (
              <div className="spinnerx center-spinnerx"></div>
            ) : (
              "Delete Contact"
            )}
            {deleteStatus && <span className="delete-statusx">{deleteStatus}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
