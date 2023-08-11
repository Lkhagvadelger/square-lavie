import { Twilio } from "twilio";
const client = new Twilio(
  `${process.env.TWILIO_ACCOUNT_SID}`,
  `${process.env.TWILIO_AUTH_TOKEN}`
);

export const sendVerificationCode = async (to: string) => {
  //before call this function phone number must be validated
  return client.verify
    .services(`${process.env.TWILIO_MESSAGING_VERIFICATION_SID}`)
    .verifications.create({
      to,
      channel: "sms",
    });
};
export const confirmVerificationCode = async (to: string, code: string) => {
  return client.verify
    .services(`${process.env.TWILIO_MESSAGING_VERIFICATION_SID}`)
    .verificationChecks.create({ to, code });
};
