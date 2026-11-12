import type tr from "../messages/tr.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: "tr" | "en";
    Messages: typeof tr;
  }
}
