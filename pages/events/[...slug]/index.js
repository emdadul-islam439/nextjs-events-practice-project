import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import ErrorAlert from "../../../components/events/error-alert";
import Button from "../../../components/ui/button";
import { getFilteredEvents } from "../../../data/helper";
import Head from "next/head";

function EventsWithSlugPage(props) {
  const [isLoading, setIsloading] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-dcbca-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  console.log("data : " + data);
  useEffect(() => {
    setIsloading(true);
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
      setIsloading(false);
    }
  }, [data]);

  if (!loadedEvents || !filterData || isLoading) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

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

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

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
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default EventsWithSlugPage;

// export async function getServerSideProps(context) {
//   const params = context.params;
//   const slugArr = params.slug;
//   const filteredYear = slugArr[0];
//   const filteredMonth = slugArr[1];
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear < 2021 ||
//     numYear > 2030 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const dateFilter = { year: numYear, month: numMonth };
//   const filteredEvents = await getFilteredEvents(dateFilter);

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       date: dateFilter,
//     },
//   };
// }
