const query = `*[_type == "agentType"]{

"imageUrl": agentPhoto.asset->url,

name,

description,

contactNumber

}`;
const cardContainer = document.querySelector(".agent-cards");

async function getAgents() {
  try {
    // Fetch data from the API
    const response = await fetch(
      `${apiUrl}?query=${encodeURIComponent(query)}`
    );
    const { result } = await response.json();

    console.log(result);

    // Ensure there's data to process
    if (result && result.length > 0) {
      result.forEach((agent) => {
        // Create a card for each agent
        const card = document.createElement("div");
        card.classList.add("agent-card");

        card.innerHTML = `
          <div class="agent-img">
            <img src="${
              agent.imageUrl ? agent.imageUrl : "placeholder.jpg"
            }" alt="${agent.name}" />
          </div>
          <div class="agent-contant">
            <h2>${agent.name}</h2>
            <p>${agent.description}</p>
            <a href="tel:${agent.contactNumber}">Connect</a>
          </div>
        `;

        // Append the card to the container
        cardContainer.appendChild(card);
      });
    } else {
      cardContainer.innerHTML = "<p>No agents found.</p>";
    }
  } catch (err) {
    console.error("Error fetching agents:", err);
    cardContainer.innerHTML =
      "<p>Failed to load agents. Please try again later.</p>";
  }
}

// Call the function to load agents
getAgents();
