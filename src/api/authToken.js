export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("token"));
  if (user) {
    return {
      Authorization: "Bearer " + user,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  } else {
    return {};
  }
}
