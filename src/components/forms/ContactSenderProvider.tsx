"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { IContactSender } from "@/core/interfaces/IContactSender";
import { MailtoContactSender } from "@/lib/contact/MailtoContactSender";

const defaultSender = new MailtoContactSender();
const ContactSenderContext = createContext<IContactSender>(defaultSender);

export function ContactSenderProvider({
  children,
  sender = defaultSender,
}: {
  children: ReactNode;
  sender?: IContactSender;
}) {
  return <ContactSenderContext.Provider value={sender}>{children}</ContactSenderContext.Provider>;
}

export function useContactSender(): IContactSender {
  return useContext(ContactSenderContext);
}
