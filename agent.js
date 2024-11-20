const query = `*[_type == "agentType"]{

"imageUrl": agentPhoto.asset->url,

name,

description,

contactNumber

}`;
const cardContainer = document.querySelector(".agent-cards");
const loading = document.querySelector(".loading");

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
      const card = document.createElement("div");
      card.classList.add("agent-card");

      card.innerHTML = `
          <div class="agent-img">
            <img src="${"./comingsoon.jpg"}" alt="comingsoon image" />
          </div>
          <div class="agent-contant">
            <h2>No Agents Right Now!</h2>
            <p>We Are launching soon!!!</p>
          </div>
        `;

      cardContainer.appendChild(card);
    }
  } catch (err) {
    console.error("Error fetching agents:", err);
    cardContainer.innerHTML =
      "<p class=`loading`>Failed to load agents. Please try again later.</p>";
  } finally {
    loading.innerHTML = "";
  }
}

// Call the function to load agents
getAgents();
