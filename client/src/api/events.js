import API from "./api";

export const getAllEvents = () =>
  API.get("/events");

export const getEventById = (id) =>
  API.get(`/events/${id}`);

export const createEvent = (data) =>
  API.post("/events", data);

export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);

export const registerForEvent = (id) =>
  API.post(`/events/${id}/register`);
