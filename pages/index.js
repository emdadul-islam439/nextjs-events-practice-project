import dummy_events from "../data/dummy_data";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {dummy_events.map((event) => {
          if (event.featured)
            return (
              <li key={event.title}>
                {`title: ${event.title}`} <br />
                {`description: ${event.description}`} <br />
                {`image: ${event.image}`} <br />
                {`is_featured: ${event.featured}`}
              </li>
            );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
