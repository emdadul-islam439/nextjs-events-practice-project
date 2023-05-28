import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../data/dummy-data";
// import dummy_events from "../../data/dummy_data";

function EventsPage() {
//   const dummy_events = dummy_events();
  return (
    <div>
      <h1>Events Page</h1>
      <EventList items={getAllEvents()} />
    </div>
  );
}

export default EventsPage;
