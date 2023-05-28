import { useRouter } from "next/router";
import { getEventById } from "../../../data/dummy-data";

import dummy_events from "../../../data/dummy_data";

function EventWithIdPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  const eventId = router.query.eventId;
  const event = getEventById(eventId);
  
  if(!event){
    return <p>No event found!</p>
  }

  return (
    <div>
      <h1>Events Page With ID</h1>
    </div>
  );
}

export default EventWithIdPage;
