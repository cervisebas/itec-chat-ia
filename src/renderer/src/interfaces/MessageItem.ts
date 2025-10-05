export interface MessageItem {
  type: 'ia' | 'user';
  content: string;
  generating?: boolean;
}
