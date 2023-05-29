import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../data/dummy-data";
import dummy_events from "../data/dummy_data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>Home Page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
