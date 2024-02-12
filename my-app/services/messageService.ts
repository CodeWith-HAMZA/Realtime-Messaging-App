import axiosInstance from './index';
import Cookies from 'js-cookie';

class MessageService {
    private token: string | undefined;

    constructor() {
        this.token = Cookies.get('token');
    }

    async sendMessage(chatId: string, content: string) {
        try {
            const response = await axiosInstance.post('/api/message/send', {
                chatId,
                content,
            }, {
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async getMessages(chatId: string) {
        try {
            const response = await axiosInstance.get(`/api/message/${chatId}`, {
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    // Add more methods for other message-related API endpoints as needed
}

export default MessageService;
