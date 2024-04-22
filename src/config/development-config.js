export const config = {
  db: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    user: "ashutosh",
    password: "admin@123",
    sync: true,
    logging: false,
    database: "medical_store",
  },
  mail: {
    username: "support@medicsstores.com",
    password: "fC45h(?N,.r&k-?",
    host: "smtp.office365.com",
    port: 587,
    service: "Outlook365",
    token_expire: "5m",
  },
};
