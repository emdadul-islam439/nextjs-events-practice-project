import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import ErrorAlert from "../../../components/events/error-alert";
import Button from "../../../components/ui/button";

function EventsWithSlugPage() {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slugArr, setSlugArr] = useState([]);
  const [numYear, setNumYear] = useState(-1);
  const [numMonth, setNumMonth] = useState(-1);
  // console.log(router.pathname);
  // console.log(router.query);

  function getYearAndMonth(slugArr) {
    const filteredYear = slugArr[0];
    const filteredMonth = slugArr[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    return { year: numYear, month: numMonth };
  }

  function getFilteredEvents(events, dateFilter) {
    const { year, month } = dateFilter;
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
    return filteredEvents;
  }

  useEffect(() => {
    setIsLoading(true);
    setSlugArr(router.query.slug);
    if (slugArr) {
      const { year, month } = getYearAndMonth(slugArr);
      setNumYear(year);
      setNumMonth(month);
    }

    fetch("https://nextjs-course-dcbca-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const events = [];
        for (const key in data) {
          events.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            location: data[key].location,
            date: data[key].date,
            image: data[key].image,
            isFeatured: data[key].isFeatured,
          });
        }

        const dateFilter = {
          year: numYear,
          month: numMonth,
        };
        const filteredEvents = getFilteredEvents(events, dateFilter);

        setIsLoading(false);
        setFilteredEvents(filteredEvents);
      });
  }, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
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

  if (isLoading) {
    return <p>Loading...</p>;
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

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default EventsWithSlugPage;
