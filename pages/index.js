import { useEffect, useState } from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../data/helper";

function HomePage(props) {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents);
  const [isLoading, setIsLoading] = useState(false);

  function getFeaturedEvents(eventList) {
    return eventList.filter((event) => event.isFeatured === true);
  }

  useEffect(() => {
    setIsLoading(true);

    fetch("https://nextjs-course-dcbca-default-rtdb.firebaseio.com/events.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("data: " + data);

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

        const featuredEvents = getFeaturedEvents(eventList);
        console.log("Featured Events: " + featuredEvents);
        setIsLoading(false);
        setFeaturedEvents(featuredEvents);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 600, //600 seconds
  };
}
