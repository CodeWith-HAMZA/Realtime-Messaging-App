import axiosInstance from "./index";

class ChatService {
  private token: string | undefined;

  constructor(AuthToken: string) {
    this.token = AuthToken;
  }

  async accessChat(otherUserId: string) {
    try {
      const response = await axiosInstance.post(
        "/api/chat/access-chat",
        {
          otherUserId,
        },
        {
          headers: {
            token: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error accessing chat:", error);
      throw error;
    }
  }

  async getAllChats() {
    try {
      const response = await axiosInstance.get("/api/chat/all", {
        headers: {
          token: this.token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all chats:", error);
      throw error;
    }
  }

  async getAllGroupChats() {
    try {
      const response = await axiosInstance.get("/api/chat/group-chats", {
        headers: {
          Authorization: `${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all group chats:", error);
      throw error;
    }
  }

  async renameGroupChat(groupId: string, newName: string) {
    try {
      const response = await axiosInstance.put(
        "/api/chat/rename",
        {
          groupId,
          newName,
        },
        {
          headers: {
            Authorization: `${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error renaming group chat:", error);
      throw error;
    }
  }
}

export default ChatService;
