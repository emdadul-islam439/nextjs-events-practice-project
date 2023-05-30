import { useEffect, useState } from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../data/helper";

function HomePage(props) {
  const featuredEvents = props.featuredEvents;

  return (
    <div>
      <h1>Home Page</h1>
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
