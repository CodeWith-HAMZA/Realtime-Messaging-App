import axiosInstance from "./index";

export default class MessageService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async createMessage(chatId: string, content: string, files: File[]) {
    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("content", content);
    if (!!files.length) {
      formData.append("file", files.at(0)); // Append file to formData
      console.log(files);
    }

    try {
      const response = await axiosInstance.post("/api/message", formData, {
        headers: {
          token: this.token,
        },
      });
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
