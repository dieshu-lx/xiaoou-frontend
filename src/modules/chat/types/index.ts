export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'image';
}

export interface ISendMessageParams {
  sessionId: string;
  question: string;
  type: 'text' | 'image';
  token?: string;
}
