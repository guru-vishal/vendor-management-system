import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import DeleteConfirmation from './DeleteConfirmation';
import toast from 'react-hot-toast';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    vendorId: null,
    vendorName: ''
  });

  useEffect(() => {
    fetchVendors();
  }, [pagination.current]);

  const fetchVendors = async (page = pagination.current) => {
    try {
      setLoading(true);
      const response = await api.get(`/vendors?page=${page}&limit=10`);
      setVendors(response.data.vendors);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch vendors');
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (vendor) => {
    setDeleteModal({
      show: true,
      vendorId: vendor._id,
      vendorName: vendor.vendorName
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/vendors/${deleteModal.vendorId}`);
      toast.success('Vendor deleted successfully');
      setDeleteModal({ show: false, vendorId: null, vendorName: '' });
      fetchVendors();
    } catch (error) {
      toast.error('Failed to delete vendor');
      console.error('Error deleting vendor:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, vendorId: null, vendorName: '' });
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, current: newPage }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading vendors...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="vendor-header">
        <h1>Vendors</h1>
        <Link to="/vendors/new" className="btn btn-primary">
          Add New Vendor
        </Link>
      </div>

      {vendors.length === 0 ? (
        <div className="vendor-grid">
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h3>No vendors found</h3>
            <p style={{padding: '30px'}}>Get started by adding your first vendor.</p>
            <Link to="/vendors/new" className="btn btn-primary">
              Add Vendor
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="vendor-grid">
            <table className="vendor-table">
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Bank Account No.</th>
                  <th>Bank Name</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td>{vendor.vendorName}</td>
                    <td>{vendor.bankAccountNo}</td>
                    <td>{vendor.bankName}</td>
                    <td>{vendor.city || 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/vendors/edit/${vendor._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(vendor)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {pagination.current} of {pagination.pages} 
                ({pagination.total} total vendors)
              </span>
              
              <button 
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current === pagination.pages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {deleteModal.show && (
        <DeleteConfirmation
          vendorName={deleteModal.vendorName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default VendorList;