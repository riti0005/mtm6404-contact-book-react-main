import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../db";
import { useNavigate } from "react-router-dom";
import './AddContactForm.css';

const AddContactForm = () => {
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone Number is required";
    if (formData.birthday && isNaN(new Date(formData.birthday).getTime())) {
      formErrors.birthday = "Invalid Date format for Birthday";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), formData);
      setStatusMessage("Contact added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);

      setFormData({
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
    } catch (error) {
      console.error("Error adding contact:", error);
      setStatusMessage("Error adding contact.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-container">
      <div className="contact-form-card shadow-lg rounded-lg p-4">
        <h2 className="text-center mb-4 contact-heading text-white">Add New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control custom-input"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control custom-input"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control custom-input"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control custom-input"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
            </div>
            <div className="col-md-4">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control custom-input"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="form-control custom-input"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                name="state"
                id="state"
                className="form-control custom-input"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="zipCode" className="form-label">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                className="form-control custom-input"
                placeholder="Enter zip code"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="company" className="form-label">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                className="form-control custom-input"
                placeholder="Enter company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="birthday" className="form-label">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="form-control custom-input"
              />
              {errors.birthday && <div className="text-danger">{errors.birthday}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="notes" className="form-label">Notes</label>
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

          <button
            type="submit"
            className="btn btn-success w-100 custom-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              statusMessage || "Add Contact"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContactForm;
