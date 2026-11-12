import type { ContactMessage, IContactSender } from "@/core/interfaces/IContactSender";

export class MailtoContactSender implements IContactSender {
  send(message: ContactMessage): void {
    window.location.assign(
      `mailto:${message.to}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`,
    );
  }
}
