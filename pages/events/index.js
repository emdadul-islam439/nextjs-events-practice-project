import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EvetntsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../data/helper";

function EventsPage(props) {
  const router = useRouter();
  const allEvents = props.allEvents;

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EvetntsSearch onSearch={findEventHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
}

export default EventsPage;

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents: allEvents,
    },
    revalidate: 600,
  };
}
