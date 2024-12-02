import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db";
import { useParams, useNavigate } from "react-router-dom";
import './EditContactForm.css';

const EditContactForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    company: "",
    birthday: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setFormData(snapshot.data());
      }
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, formData);

      setStatusMessage("Contact updated successfully!");
      setTimeout(() => {
        navigate(`/contact/${id}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating contact:", error);
      setStatusMessage("Error updating contact.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-container">
      <div className="contact-form-card shadow-lg rounded-lg p-4">
        <h2 className="text-center mb-4 text-white contact-heading">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label text-white">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label text-white">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control custom-input"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="phoneNumber" className="form-label text-white">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="address" className="form-label text-white">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="city" className="form-label text-white">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="state" className="form-label text-white">State</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="zipCode" className="form-label text-white">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="company" className="form-label text-white">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="birthday" className="form-label text-white">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="notes" className="form-label text-white">Notes</label>
              <input
                id="notes"
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100 custom-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              statusMessage || "Update Contact"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContactForm;
