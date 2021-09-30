import Messages from "../models/messages";
import Conversation from "../models/conversation";
import { JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken';
import { RECEIVER, SENDER } from "../config/constants";



const socketEvent = async (io) => {
  // io.use(function(socket, next){
  //   if (socket.handshake.query && socket.handshake.query.token){
  //     jwt.verify(socket.handshake.query.token, JWT_SECRET, function(err, decoded) {
  //       if (err){console.log('Socket Authentication error');
  //        return next(new Error('Authentication error'))};
  //       socket.decoded = decoded;
  //       next();
  //     });
  //   }
  //   else {
  //     next(new Error('Authentication error'));
  //   }    
  // });
  io.on('connection', socket => {
    ///join room  
    socket.on('join', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joining ${room}`);
    })
    ///listen from chat event
    socket.on('chat', async (data) => {
      try {
        console.log(data);
        const { message, conversationID: id_conv } = data;
        const {  sendBy, content } = message;
        const room = id_conv;
        const newMessage = new Messages({ content: content, sendBy: sendBy });
        const savedMessage = await newMessage.save();

        const unseenBy = sendBy === SENDER ? SENDER : RECEIVER;
        await Conversation.findByIdAndUpdate({ "_id": id_conv }, { "$push": { "messages": savedMessage._id }, unseen: true, unseenBy });
        
        console.log(`user: ${sendBy}, room: ${room}`);
        io.to(room).emit('chat', message);
      } catch (e) {
        console.log(e);
      }
    });
    ///listen from notification event
    socket.on('notification', (data) => {
      const { message, room } = data;
      console.log(`notification ==> message: ${message}, room: ${room}`);
      io.to(room).emit('notification', message);
    });
    ///disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

export default socketEvent; 