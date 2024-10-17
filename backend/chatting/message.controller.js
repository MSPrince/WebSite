const Conversation = require("./conversation.model.js");
const Message = require("./message.model.js");

// message.controller.js
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find the existing conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Push the new message ID to the conversation's messages array and save the conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    	if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
}
// Export the function using CommonJS syntax
module.exports = {
  sendMessage,
  getMessages,
};
