import { useRouter } from "next/router";

import dummy_events from "../../../data/dummy_data";

function EventsWithSlugPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);
  // const id = router.query["some-id"];
  const slugArr = router.query["slug"];
  console.log(slugArr);
//   const date = slugArr[0];
//   console.log(date);
//   const is_true = slug_arr[1] === "true";
  // let is_found = false;

  return (
    <div>
      <h1>Events With SLUG Page</h1>
      {/* <ul>
        {dummy_events.map((event) => {
          if (event.date === date && event.featured === is_true) {
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
        {!is_found && <h6>{"Could not found any item!"}</h6>}
      </ul> */}
    </div>
  );
}

export default EventsWithSlugPage;
