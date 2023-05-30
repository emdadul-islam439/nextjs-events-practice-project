import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import ErrorAlert from "../../../components/events/error-alert";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../../data/helper";

function EventWithIdPage(props) {
  const filteredEvent = props.filteredEvent;
  // console.log(router.pathname);
  // console.log(router.query);

  return (
    <Fragment>
      <Head>
        <title>{filteredEvent.title}</title>
        <meta name="description" content={filteredEvent.description} />
      </Head>
      <EventSummary title={filteredEvent.title} />
      <EventLogistics
        date={filteredEvent.date}
        address={filteredEvent.location}
        image={filteredEvent.image}
        imageAlt={filteredEvent.title}
      />
      <EventContent>
        <p>{filteredEvent.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventWithIdPage;

export async function getStaticProps(context) {
  const params = context.params;
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      filteredEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}
