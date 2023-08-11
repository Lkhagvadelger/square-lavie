import { EmailType } from "./types";

interface Email {
  [key: string]: {
    subject: string;
    body: string;
  };
}

interface EmailTemplateType {
  type: EmailType;
  email: Email;
}
export const emailTemplates = (lang: string, type: EmailType, data: {}) => {
  const a: EmailTemplateType[] = [
    {
      type: EmailType.PasswordReset,
      email: {
        en: {
          subject: ``,
          body: ``,
        },
        mn: {
          subject: ``,
          body: ``,
        },
        es: {
          subject: ``,
          body: ``,
        },
      },
    },
  ];
  const applyData = () => {
    if (a.filter((r) => r.type == type).length === 0)
      return { subject: "", body: "" };

    if (!a.filter((r) => r.type == type)[0].email[lang])
      return { subject: "", body: "" };

    let selectedTemplate = a.filter((r) => r.type == type)[0].email[lang];

    return {
      subject: selectedTemplate.subject.replace(
        /{([^{}}]+)}/g,
        (_match: any, valueKey: any) => {
          for (const [k, v] of Object.entries(data)) {
            if (k == valueKey) return v + "";
          }
          return _match;
        }
      ),
      body: selectedTemplate.body.replace(
        /{([^{}}]+)}/g,
        (_match: any, valueKey: any) => {
          for (const [k, v] of Object.entries(data)) {
            if (k == valueKey) return v + "";
          }
          return _match;
        }
      ),
    };
  };
  return applyData();
};
