import { describe, expect, it } from "vitest";
import { composeContactBody } from "@/lib/contact/compose";

describe("composeContactBody", () => {
  it("combines contact details, extras, and message", () => {
    const result = composeContactBody(
      { name: "Ada", email: "ada@example.com", phone: "555", extra: ["CV: ada.pdf"] },
      "Merhaba",
      {
        name: ({ value }) => `Ad: ${value}`,
        email: ({ value }) => `E-posta: ${value}`,
        phone: ({ value }) => `Telefon: ${value}`,
      },
    );
    expect(result).toBe("Ad: Ada\nE-posta: ada@example.com\nTelefon: 555\nCV: ada.pdf\n\nMerhaba");
  });
});
