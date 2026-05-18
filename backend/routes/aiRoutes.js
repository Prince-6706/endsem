const express = require('express');
const axios = require('axios');
const Employee = require('../models/Employee');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/ai/recommend
// @desc    Get AI recommendations for an employee or all employees
// @access  Private
router.post('/recommend', protect, async (req, res) => {
  try {
    const { employeeId, allEmployees } = req.body;
    let promptText = '';

    if (allEmployees) {
      const employees = await Employee.find({});
      if (employees.length === 0) return res.status(404).json({ message: 'No employees found' });
      
      const empData = employees.map(e => `${e.name} (${e.department}): Score ${e.performanceScore}, Skills: ${e.skills.join(', ')}`).join('\n');
      promptText = `Analyze the following employees and rank them for promotions, suggest who needs training, and provide general feedback based on their performance score and skills:\n\n${empData}`;
    } else if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      
      promptText = `Analyze this employee: Name: ${employee.name}, Department: ${employee.department}, Experience: ${employee.experience} years, Performance Score: ${employee.performanceScore}, Skills: ${employee.skills.join(', ')}. Provide a recommendation on promotion, any needed skill enhancement (training suggestions), and general AI feedback.`;
    } else {
      return res.status(400).json({ message: 'Provide employeeId or set allEmployees to true' });
    }

    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // or 'google/gemini-pro', 'anthropic/claude-3-haiku'
        messages: [{ role: 'user', content: promptText }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', 
          'X-Title': 'MERN AI Employee Analytics'
        }
      }
    );

    const aiRecommendation = response.data.choices[0].message.content;
    res.json({ recommendation: aiRecommendation });

  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error generating AI recommendation', error: error.message });
  }
});

module.exports = router;
