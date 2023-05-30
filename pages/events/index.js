import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EvetntsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../data/helper";
import Head from "next/head";

function EventsPage(props) {
  const router = useRouter();
  const allEvents = props.allEvents;

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="All NextJs events that will attract you..."
        />
      </Head>
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
