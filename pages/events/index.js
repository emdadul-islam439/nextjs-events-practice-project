import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EvetntsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../data/dummy-data";
// import dummy_events from "../../data/dummy_data";

function EventsPage() {
  const router = useRouter();
  const allEvents = getAllEvents();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EvetntsSearch onSearch={findEventHandler}/>
      <EventList items={allEvents} />
    </Fragment>
  );
}

export default EventsPage;
