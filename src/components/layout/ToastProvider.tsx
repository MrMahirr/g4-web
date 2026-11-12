"use client";

import dynamic from "next/dynamic";

const SonnerToaster = dynamic(() => import("sonner").then((module) => module.Toaster), { ssr: false });

export function ToastProvider() {
  return <SonnerToaster position="bottom-right" toastOptions={{ className: "font-sans" }} />;
}
