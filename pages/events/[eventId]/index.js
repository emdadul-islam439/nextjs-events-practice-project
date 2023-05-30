import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import ErrorAlert from "../../../components/events/error-alert";

function EventWithIdPage() {
  const [filteredEvent, setFilteredEvent] = useState({});
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

        const eventById = getEventById(eventList);
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
