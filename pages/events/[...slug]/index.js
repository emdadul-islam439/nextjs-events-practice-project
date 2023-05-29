import { useRouter } from "next/router";
import EventList from "../../../components/events/event-list";

import { getFilteredEvents } from "../../../data/dummy-data";

function EventsWithSlugPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  const slugArr = router.query.slug;
  console.log(slugArr);

  if (!slugArr) {
    return <p className="center">Loading...</p>;
  }

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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export default EventsWithSlugPage;
