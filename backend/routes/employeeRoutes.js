const express = require('express');
const Employee = require('../models/Employee');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/employees
// @desc    Add a new employee
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json(employee);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
});

// @route   GET /api/employees
// @desc    Get all employees
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/employees/search
// @desc    Search employee by department
// @access  Private
router.get('/search', protect, async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ message: 'Please provide a department to search' });
    }

    const employees = await Employee.find({ 
      department: { $regex: new RegExp(department, 'i') } 
    });
    
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
