import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const EditVendor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vendors/${id}`);
      setFormData(response.data.vendor);
    } catch (error) {
      toast.error('Failed to fetch vendor details');
      console.error('Error fetching vendor:', error);
      navigate('/vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.vendorName.trim()) {
      newErrors.vendorName = 'Vendor name is required';
    }
    
    if (!formData.bankAccountNo.trim()) {
      newErrors.bankAccountNo = 'Bank account number is required';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.addressLine2.trim()) {
      newErrors.addressLine2 = 'Address Line 2 is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    try {
      setSubmitting(true);
      await api.put(`/vendors/${id}`, formData);
      toast.success('Vendor updated successfully');
      navigate('/vendors');
    } catch (error) {
      toast.error('Failed to update vendor');
      console.error('Error updating vendor:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading vendor details...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="vendor-header">
        <h1>Edit Vendor</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vendorName" className="required">
              Vendor Name
            </label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              className={`form-control ${errors.vendorName ? 'error' : ''}`}
              placeholder="Enter vendor name"
            />
            {errors.vendorName && (
              <div className="error-message">{errors.vendorName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bankAccountNo" className="required">
              Bank Account Number
            </label>
            <input
              type="text"
              id="bankAccountNo"
              name="bankAccountNo"
              value={formData.bankAccountNo}
              onChange={handleChange}
              className={`form-control ${errors.bankAccountNo ? 'error' : ''}`}
              placeholder="Enter bank account number"
            />
            {errors.bankAccountNo && (
              <div className="error-message">{errors.bankAccountNo}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bankName" className="required">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className={`form-control ${errors.bankName ? 'error' : ''}`}
              placeholder="Enter bank name"
            />
            {errors.bankName && (
              <div className="error-message">{errors.bankName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter address line 1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLine2" className="required">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className={`form-control ${errors.addressLine2 ? 'error' : ''}`}
              placeholder="Enter address line 2"
            />
            {errors.addressLine2 && (
              <div className="error-message">{errors.addressLine2}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter zip code"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Vendor'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/vendors')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVendor;