import { makeAutoObservable } from 'mobx';

import { chatWithAI, generateImage } from '../service';
import { Message } from '../types';

class ChatStore {
  sessionId: string = '';
  messages: Message[] = [];
  loading: boolean = false;
  mode: 'text' | 'image' = 'text';
  imageToken: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSessionId = (sessionId: string) => {
    this.sessionId = sessionId;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setMode = (mode: 'text' | 'image') => {
    this.mode = mode;
  };

  setImageToken(token: string) {
    this.imageToken = token;
  }

  updateMessage = (message: Message) => {
    this.messages = this.messages.at(-1) ? [...this.messages.slice(0, -1), message] : [message];
  };

  sendMessage = async (question: string) => {
    this.messages.push({
      id: Math.random().toString(36).substring(2, 15),
      role: 'user',
      content: question,
      type: this.mode,
    });
    this.setLoading(true);
    if (this.mode === 'text') {
      const response = {
        id: '',
        role: 'assistant' as const,
        content: '',
        type: this.mode,
      };
      await chatWithAI(question, (text, done) => {
        this.setLoading(false);
        if (!response.id) {
          response.id = Math.random().toString(36).substring(2, 15);
          this.messages.push(response);
        }
        response.content += text;
        this.updateMessage(response);
        if (done) {
          return;
        }
      });
    } else {
      const response = await generateImage({
        sessionId: this.sessionId,
        type: this.mode,
        question,
        token: this.imageToken,
      });
      this.messages.push(response);
      this.setLoading(false);
    }
  };
}

export const chatStore = new ChatStore();
