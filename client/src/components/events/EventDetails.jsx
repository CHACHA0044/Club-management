import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, registerForEvent } from "../../api/events";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      setEvent(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setRegistering(true);
    setMessage("");

    try {
      const res = await registerForEvent(id);
      setMessage(res.data.message || "Registration successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      {event.photo && <img src={event.photo} alt={event.title} />}
      
      <div className="event-info">
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.place}</p>
      </div>

      {message && <div className="message">{message}</div>}

      <button onClick={handleRegister} disabled={registering}>
        {registering ? "Registering..." : "Register for Event"}
      </button>
    </div>
  );
};

export default EventDetails;