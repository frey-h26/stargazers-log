fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    const list = document.querySelector("#starred");
    if (!Array.isArray(events) || events.length === 0) {
      list.innerHTML = "<li>No starred repositories yet.</li>";
      return;
    }
    events.forEach((event) => {
      if (!event.name || !event.starred) {
        console.warn("Invalid event object:", event);
        return;
      }
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
  })
  .catch((error) => {
    console.error("Error loading starred repositories:", error);
    const list = document.querySelector("#starred");
    list.innerHTML = "<li style='color: red;'>Failed to load starred repositories. Please try again later.</li>";
  });
