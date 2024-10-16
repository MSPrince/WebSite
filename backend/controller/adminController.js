const User = require("../models/userModal.js");
const Contact = require("../models/contactModal.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log(users);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};




// edit user logic
const getUserById = async(req,res, next)=>{
try {
   const id = req.params.id;
   const data =  await User.findOne({ _id: id } , {password:0});
     return res.status(200).json(data);
} catch (error) {
  next(error)
  
}
}


const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    // Find the user by id and update
    const updatedUser = await User.updateOne(
      { _id: id },
      { $set: updateUserData }
    );

    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    next(error);
  }
};














// -----------------
// delete user logic
// ------------------------

const deleteUserById = async (req,res, next)=>{
  // logic to delete user by id
  try {
    const id = req.params.id;
    await User.deleteOne({_id: id});
    return res.status(200).json({message: "User deleted successfully"});

    
  } catch (error) {
  next(error)
    
  }
}















// ---------------------------
// *** get all contacts
// -----------------------
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};




const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
