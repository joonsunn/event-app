import axios from "axios";
import { baseUrl } from "../../utils/config";

const resources = {
  getEvents: "/api/events",
};

export const getEvents = async () => {
  const response = await axios.get(`${baseUrl}${resources.getEvents}`);

  return response.data;
};
