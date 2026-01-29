import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../api/events";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="events-list">
      <h2>All Events</h2>
      
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              {event.photo && <img src={event.photo} alt={event.title} />}
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
              <p><strong>Place:</strong> {event.place}</p>
              <Link to={`/events/${event._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;