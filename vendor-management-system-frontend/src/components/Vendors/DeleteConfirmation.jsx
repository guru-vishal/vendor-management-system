import React from 'react';

const DeleteConfirmation = ({ vendorName, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Confirm Delete</h3>
        <p className="modal-message">
          Are you sure you want to delete the vendor "{vendorName}"? 
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button 
            onClick={onConfirm}
            className="btn btn-danger"
          >
            Delete
          </button>
          <button 
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;