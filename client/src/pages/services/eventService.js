import axios from "axios";
import { baseUrl } from "../../utils/config";
import { getToken } from "./loginService";

const resources = {
  getEvents: "/api/events",
  getEventsByStatus: "/api/events/status",
  updateEvent: "/api/events/updateEvent",
};

export const getEvents = async (status) => {
  // const response = await axios.get(`${baseUrl}${resources.getEvents}`);
  if (!status) {
    status = "all";
  }
  const response = await axios.get(`${resources.getEventsByStatus}/${status}`);

  return response.data;
};

export const updateEvent = async (id, event) => {
  const response = await axios.patch(
    `${resources.updateEvent}/${id}`,
    event,
    getToken()
  );
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(
    `${resources.getEvents}/${id}`,
    getToken()
  );
  return response.data;
};

export const createEvent = async (event) => {
  const response = await axios.post(
    `${resources.getEvents}`,
    event,
    getToken()
  );
  return response.data;
};
