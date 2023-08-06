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
          subject: `Mederva Health password reset request PIN code`,
          body: `<p>Hello,</p>
          <p>Please input {pin} as password reset PIN code.</p>
          <p>Please contact us if you have any questions.</p>
          <p>Mederva Health</p>
          <p>support@medervahealth.com</p>`,
        },
        mn: {
          subject: `Mederva Health нууц үг шинэчлэх хүсэлтийн PIN код`,
          body: `<p>Сайн байна уу,</p>
          <p>Нууц үг солих дэлгэцэнд {pin} кодыг оруулна уу.</p>
          <p>Танд асууж лавлах зүйл байвал бидэнтэй холбогдоорой.</p>
          <p>Mederva Health</p>
          <p>support@medervahealth.com</p>`,
        },
        es: {
          subject: `Solicitud de restablecimiento de contraseña de Mederva Health Código PIN`,
          body: `<p>Hola,</p>
          <p>Ingrese {pin} como código PIN para restablecer la contraseña.</p>
          <p>Por favor, póngase en contacto con nosotros si tiene alguna pregunta.</p>
          <p>Mederva Health</p>
          <p>support@medervahealth.com</p>`,
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
