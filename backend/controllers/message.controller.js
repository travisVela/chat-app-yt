import { populate } from "dotenv";
import Convo from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let convo = await Convo.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!convo) {
      convo = await Convo.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      convo.messages.push(newMessage._id);
    }

    // await convo.save();
    // await newMessage.save();

    await Promise.all([convo.save(), newMessage.save()]);

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("error in send message controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const userId = req.user._id;
    console.log(userId);
    console.log(userToChatId);

    const convo = await Convo.findOne({
      participants: {
        $all: [userId, userToChatId],
      },
    }).populate("messages");

    if (!convo) return res.status(200).json([]);

    res.status(200).json(convo.messages);
  } catch (error) {
    console.log("error in get message controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
