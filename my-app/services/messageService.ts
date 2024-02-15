import axiosInstance from "./index";

export default class MessageService {
  private token: string;

  
  constructor(token: string) {
    this.token = token;
  }

  async createMessage(chatId: string, content: string) {
    try {
      const response = await axiosInstance.post(
        "/api/message",
        {
          chatId,
          content,
        },
        {
          headers: {
            token: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  async getMessagesForChat(chatId: string) {
    try {
      const response = await axiosInstance.get(`/api/message/${chatId}`, {
        headers: {
          token: this.token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }
}
