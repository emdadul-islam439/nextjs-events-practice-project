import dummy_events from "../../data/dummy_data";

function EventsPage() {
//   const dummy_events = dummy_events();
  return (
    <div>
      <h1>Events Page</h1>
      <ul>
        {dummy_events.map((event) => (
          <li key={event.title}>
            {`title: ${event.title}`} <br />
            {`description: ${event.description}`} <br />
            {`image: ${event.image}`} <br />
            {`is_featured: ${event.featured}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
