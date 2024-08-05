export const DB_NAME = "medical-store";
export const THRESHOLD_VALUE_OF_MEDICINE_TO_CREATE_REMINDER_QUEUE = 2;
export const EMAIL_TEMPLATE_HTML_FILE_PATH = [
  {
    type: "verification-email",
    path: "/templates/verification-email.html",
  },
  {
    type: "forgot-password",
    path: "/templates/forgot-password.html",
  },
];
