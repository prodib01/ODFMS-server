const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const userModel = require('../models/Users'); // Import the userModel

const signup = async (req, res) => {
  const { full_name, email, phone, address, gender, password } = req.body;

  if (!full_name || !email || !phone || !address || !gender || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }
  try {
    const userExists = await userModel.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Pass the role 'admin' as the last argument to createUser function
    await userModel.createUser(full_name, email, phone, address, gender, password, 'admin');

    // Fetch the created user
    const user = await userModel.findUserByEmail(email);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).send('Error in creating user');
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const tokenPayload = {
      userId: user.id,
      role: user.position,
      full_name: user.full_name 
    };
    const token = jwt.sign(tokenPayload, "Antonia", { expiresIn: "24h" });

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user.id,
      role: user.position,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      status: "error",
       message: "Internal server error" 
      });
  }
};




const getStaffAddedByUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId; 

    const staff = await userModel.getStaffAddedByUser(loggedInUserId); 

    res.status(200).json({
      status: "success",
      message: "Staff fetched successfully",
      staff: staff
  });
  
  } catch (error) {
    console.error('Error fetching users added by logged-in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Function to generate a random password
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // Generates a random alphanumeric password of length 8
};

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eazedairy@gmail.com',
        pass: 'dngh jjwa fjux evkv' // your password
      }
    });

    let mailOptions = {
      from: 'EAZEDAIRY',
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


const addStaff = async (req, res) => {
  const { full_name, email, phone, address, gender, position, department, state_of_employment } = req.body;
  const loggedInUserId = req.user.userId;

  if (!full_name || !email || !phone || !address || !gender || !position || !department || !state_of_employment) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const userExists = await userModel.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const password = generateRandomPassword(); // Generate a random password

    await userModel.createStaffMember(full_name, email, phone, address, gender, password, position, department, state_of_employment, loggedInUserId);

    try {
      await sendEmail(email, 'Password Setup', ` Dear ${full_name} ;
      Thank you for using EAZEDAIRY. Your password is: ${password} You can with time change your password. If you have any questions, please contact us at eazedairy@gmail.com`);
      res.status(201).json({ message: "Staff member added successfully" });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      res.status(201).json({ message: "Staff member added successfully, but failed to send email" });
    }
  } catch (err) {
    console.error("Error adding staff member:", err);
    res.status(500).json({ message: "Error adding staff member" });
  }
};


const updateStaff = async (req, res) => {
  const { full_name, email, phone, address, gender, position, department, state_of_employment } = req.body;
  const loggedInUserId = req.user.userId;
  const staffId = req.params.staffId;
  const staff = await userModel.findUserById(staffId);
  if (staff.added_by!== loggedInUserId) {
    return res.status(401).json({ message: "You are not authorized to update this user" });
  }
  try { 
     userModel.updateStaffMember(full_name, email, phone, address, gender, position, department, state_of_employment, staffId);
    res.status(200).json({ status: "success", message: "Staff member updated successfully" });
  } catch (err) {
    console.error("Error updating staff  member:", err);
    res.status(500).json({ message: "Error updating staff member" });
  }

};

//endpoint to delete the user
const deleteStaff = async (req, res) => {
  const staffId = req.params.staffId;
  const loggedInUserId = req.user.userId;
  
  try {
    const staff = await userModel.findUserById(staffId);
    
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    
    if (staff.added_by !== loggedInUserId) {
      return res.status(401).json({ message: "You are not authorized to delete this user" });
    }

    await userModel.deleteStaffMember(staffId);
    res.status(200).json({ status: "success", message: "Staff member deleted successfully" });

  } catch (err) {
    console.error("Error deleting staff member:", err);
    res.status(500).json({ message: "Error deleting staff member" });
  }
};


module.exports = { signup, login, getStaff: getStaffAddedByUser, addStaff, updateStaff, deleteStaff };
