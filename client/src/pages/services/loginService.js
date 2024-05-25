import axios from "axios";
import { baseUrl } from "../../utils/config";

const resources = {
  login: "/api/login",
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}${resources.login}`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: "Login unsuccessful. Please try again." };
  }
};
