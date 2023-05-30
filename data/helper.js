export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-dcbca-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const allEvents = [];
  for (const key in data) {
    allEvents.push({
      id: key,
      ...data[key],
    });
  }
  return allEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
