import axios from "axios";

const resources = {
  login: "/api/login",
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${resources.login}`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: "Login unsuccessful. Please try again." };
  }
};

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) return null;

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
      accepts: "application/json",
    },
  };
};
