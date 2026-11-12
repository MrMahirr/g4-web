type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  extra?: string[];
};

type ContactLabels = {
  name: (values: { value: string }) => string;
  email: (values: { value: string }) => string;
  phone: (values: { value: string }) => string;
};

export function composeContactBody(details: ContactDetails, message: string, labels: ContactLabels): string {
  return [
    labels.name({ value: details.name }),
    labels.email({ value: details.email }),
    labels.phone({ value: details.phone }),
    ...(details.extra ?? []),
    "",
    message,
  ].join("\n");
}
