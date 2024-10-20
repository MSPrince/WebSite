const express = require('express')
const { Server } = require('socket.io')
const http  = require('http')
const getUserDetailsFromToken = require('../helper/getUserDetailsFromToken')
// const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const User = require('../models/userModal')
const { ConversationModel,MessageModel } = require('../models/ConversationModel')
const getConversation = require('../helper/getConversation')

const app = express()

// /***socket connection */
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "https://frontt-pmpw.onrender.com",
    credentials: true,
  },
});

// //online user
const onlineUser = new Set()

io.on("connection", async (socket) => {
  console.log("User connected", socket.id);

  try {
    const token = socket.handshake.auth.token;
    console.log("Socket token:", token);

    // Get user details from the token
    const user = await getUserDetailsFromToken(token);
    if (!user) {
      socket.disconnect();
      console.log("User not found, disconnecting socket:", socket.id);
      return;
    }
    console.log("Current user:", user);

    // Join the user to their specific room
    const userId = user?._id?.toString();
    socket.join(userId);
    onlineUser.add(userId);
    io.emit("onlineUser", Array.from(onlineUser));

    // Listen for message-page request
    socket.on("message-page", async (userId) => {
      try {
        const userDetails = await User.findById(userId).select("-password");

        const payload = {
          _id: userDetails?._id,
          username: userDetails?.username,
          email: userDetails?.email,
          profile_Image: userDetails?.profileImage,
          online: onlineUser.has(userId),
        };
        socket.emit("socket message-user", payload);

        // Fetch previous messages between the users
        const getConversationMessage = await ConversationModel.findOne({
          $or: [
            { sender: user?._id, receiver: userId },
            { sender: userId, receiver: user?._id },
          ],
        })
          .populate("messages")
          .sort({ updatedAt: -1 });

        socket.emit("message", getConversationMessage?.messages || []);
      } catch (error) {
        console.error("Error fetching message page:", error);
      }
    });

    // Listen for new messages
    socket.on("new message", async (data) => {
      try {
        // Check if a conversation exists between the users
        let conversation = await ConversationModel.findOne({
          $or: [
            { sender: data?.sender, receiver: data?.receiver },
            { sender: data?.receiver, receiver: data?.sender },
          ],
        });

        // Create a new conversation if it does not exist
        if (!conversation) {
          const createConversation = new ConversationModel({
            sender: data?.sender,
            receiver: data?.receiver,
          });
          conversation = await createConversation.save();
        }

        const message = new MessageModel({
          text: data.text,
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
          msgByUserId: data?.msgByUserId,
        });
        const savedMessage = await message.save();

        await ConversationModel.updateOne(
          { _id: conversation?._id },
          { $push: { messages: savedMessage?._id } }
        );

        const getConversationMessage = await ConversationModel.findOne({
          $or: [
            { sender: data?.sender, receiver: data?.receiver },
            { sender: data?.receiver, receiver: data?.sender },
          ],
        })
          .populate("messages")
          .sort({ updatedAt: -1 });

       
        io.to(data?.sender).emit(
          "message",
          getConversationMessage?.messages || []
        );
        io.to(data?.receiver).emit(
          "message",
          getConversationMessage?.messages || []
        );

        //send conversation
        const conversationSender = await getConversation(data?.sender);
        const conversationReceiver = await getConversation(data?.receiver);

        io.to(data?.sender).emit("conversation", conversationSender);
        io.to(data?.receiver).emit("conversation", conversationReceiver);
      } catch (error) {
        console.error("Error handling new message:", error);
      }
    });

    // Listen for sidebar data request
    socket.on("sidebar", async (currentUserId) => {
      const conversation = await getConversation(currentUserId);

      socket.emit("conversation", conversation);
    });


     socket.on("seen", async (msgByUserId) => {
       let conversation = await ConversationModel.findOne({
         $or: [
           { sender: user?._id, receiver: msgByUserId },
           { sender: msgByUserId, receiver: user?._id },
         ],
       });

       const conversationMessageId = conversation?.messages || [];

       const updateMessages = await MessageModel.updateMany(
         { _id: { $in: conversationMessageId }, msgByUserId: msgByUserId },
         { $set: { seen: true } }
       );

       //send conversation
       const conversationSender = await getConversation(user?._id?.toString());
       const conversationReceiver = await getConversation(msgByUserId);

       io.to(user?._id?.toString()).emit("conversation", conversationSender);
       io.to(msgByUserId).emit("conversation", conversationReceiver);
     });

     
    // Handle disconnection
    socket.on("disconnect", () => {
      onlineUser.delete(userId);
      console.log("User disconnected:", socket.id);
      io.emit("onlineUser", Array.from(onlineUser));
    });
  } catch (error) {
    console.error("Error during connection setup:", error);
    socket.disconnect();
  }
});


module.exports = {
    app,
    server
}

