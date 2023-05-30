import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../data/helper";

function HomePage(props) {
  const featuredEvents = props.featuredEvents;

  return (
    <div>
      <Head>
        <title>Featured Events</title>
        <meta name="description" content="Find a lot of events that will allow you to evolve..." />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800, //600 seconds
  };
}
