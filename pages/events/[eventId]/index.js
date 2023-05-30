import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import ErrorAlert from "../../../components/events/error-alert";
import { getAllEvents, getEventById } from "../../../data/helper";

function EventWithIdPage(props) {
  const [filteredEvent, setFilteredEvent] = useState(props.filteredEvent);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(router.pathname);
  // console.log(router.query);
  const router = useRouter();
  const eventId = router.query.eventId;

  function getEventById(eventList, eventId) {
    return eventList.find((event) => event.id === eventId);
  }

  useEffect(() => {
    setIsLoading(true);

    fetch("https://nextjs-course-dcbca-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        const eventList = [];
        for (const key in data) {
          eventList.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            location: data[key].location,
            date: data[key].date,
            image: data[key].image,
            isFeatured: data[key].isFeatured,
          });
        }

        const eventById = getEventById(eventList, eventId);
        setIsLoading(false);
        setFilteredEvent(eventById);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!filteredEvent) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
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

  return {
    props: {
      filteredEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}
