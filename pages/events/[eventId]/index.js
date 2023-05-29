import { useRouter } from "next/router";
import { Fragment } from "react";

import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import { getEventById } from "../../../data/dummy-data";
import ErrorAlert from "../../../components/events/error-alert";
import Button from "../../../components/ui/button";

function EventWithIdPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
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
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventWithIdPage;
