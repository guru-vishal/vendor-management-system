import Vendor from '../models/Vendor.js';

export const createVendor = async (req, res) => {
  try {
    const vendorData = {
      ...req.body,
      createdBy: req.user._id
    };
    
    const vendor = new Vendor(vendorData);
    await vendor.save();
    
    res.status(201).json({
      success: true,
      message: 'Vendor created successfully',
      vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating vendor',
      error: error.message
    });
  }
};

export const getVendors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const vendors = await Vendor.find({ createdBy: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Vendor.countDocuments({ createdBy: req.user._id });
    
    res.json({
      success: true,
      vendors,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendors',
      error: error.message
    });
  }
};

export const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    res.json({
      success: true,
      vendor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vendor',
      error: error.message
    });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Vendor updated successfully',
      vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating vendor',
      error: error.message
    });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Vendor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting vendor',
      error: error.message
    });
  }
};