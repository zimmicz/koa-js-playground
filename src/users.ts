const admin = {
  username: "admin",
  password: "secret",
  token: "adminToken",
};
const user = {
  username: "user",
  password: "secret",
  token: "userToken",
};
const users = [admin, user] as const;

export { admin, users };
