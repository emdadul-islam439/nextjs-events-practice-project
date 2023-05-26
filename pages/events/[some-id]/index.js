import { useRouter } from "next/router";

import dummy_events from "../../../data/dummy_data";

function EventWithIdPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  const id = router.query["some-id"];
  let is_found = false;

  return (
    <div>
      <h1>Events Page With ID</h1>
      <ul>
        {dummy_events.map((event) => {
          if (event.title === id) {
            is_found = true;
            return (
              <li key={event.title}>
                {`title: ${event.title}`} <br />
                {`description: ${event.description}`} <br />
                {`image: ${event.image}`} <br />
                {`is_featured: ${event.featured}`}
              </li>
            );
          }
        })}
        {
            !is_found && <h6>{"Could not found any item!"}</h6>
        }
      </ul>
    </div>
  );
}

export default EventWithIdPage;
