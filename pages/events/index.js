import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EvetntsSearch from "../../components/events/events-search";

function EventsPage() {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
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

        setIsLoading(false);
        setAllEvents(eventList);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <EvetntsSearch onSearch={findEventHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
}

export default EventsPage;
