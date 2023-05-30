import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import ErrorAlert from "../../../components/events/error-alert";
import Button from "../../../components/ui/button";
import { getFilteredEvents } from "../../../data/helper";

function EventsWithSlugPage(props) {
  const filteredEvents = props.filteredEvents;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default EventsWithSlugPage;

export async function getServerSideProps(context) {
  const params = context.params;
  const slugArr = params.slug;
  const filteredYear = slugArr[0];
  const filteredMonth = slugArr[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: { hasError: true },
    };
  }

  const dateFilter = { year: numYear, month: numMonth };
  const filteredEvents = await getFilteredEvents(dateFilter);

  return {
    props: {
      filteredEvents: filteredEvents,
      date: dateFilter,
    },
  };
}
