import { fetchEventSource } from '@microsoft/fetch-event-source';

import { $http } from '@/utils';

import { ISendMessageParams, Message } from '../types';

export const sendMessage = async (params: ISendMessageParams) => {
  const response = await $http.post<Message>('/api/chat', params);
  return response.data;
};

export const generateImage = async (params: ISendMessageParams) => {
  const response = await $http.post<Message>('/api/text-to-image', params);
  return response.data;
};

export const chatWithAI = async (question: string, callback: (text: string, done?: boolean) => void) => {
  fetchEventSource('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
    onmessage(event) {
      if (event.data !== '[DONE]') {
        const text = JSON.parse(event.data).content;
        callback(text);
      } else {
        callback('', true);
      }
    },
  });
};
