export type ContactMessage = {
  to: string;
  subject: string;
  body: string;
};

export interface IContactSender {
  send(message: ContactMessage): void;
}
