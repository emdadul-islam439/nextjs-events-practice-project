import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EvetntsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../data/dummy-data";
// import dummy_events from "../../data/dummy_data";

function EventsPage() {
  const allEvents = getAllEvents();
  return (
    <Fragment>
      <EvetntsSearch />
      <EventList items={allEvents} />
    </Fragment>
  );
}

export default EventsPage;
