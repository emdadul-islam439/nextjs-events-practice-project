import EventItem from "./event-item";

function EventList(props) {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          location={item.location}
          data={item.data}
          image={item.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
