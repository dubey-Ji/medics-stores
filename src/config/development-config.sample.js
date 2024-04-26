export const config = {
  db: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    user: "random",
    password: "random",
    sync: true,
    logging: false,
    database: "random",
  },
  mail: {
    username: "help@medicsstore.com",
    password: "1234",
    host: "smtp.gmail.com",
    port: 587,
    service: "google",
    token_expire: "5m",
  },
};
