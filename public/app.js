fetch('http://localhost:3000/api/shop')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((shopData) => {
    const shopContainer = document.getElementById("shop-container");

    // Create a document fragment for optimized rendering
    const fragment = document.createDocumentFragment();

    shopData.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "shop-item";

      // Dynamically render each shop item
      itemDiv.innerHTML = `
        <h2>${item.devName}</h2>
        <p>Price: ${item.finalPrice} V-Bucks</p>
        <div class="image-container">
          <img 
            src="${item.image}" 
            alt="${item.devName}" 
            width="100" 
            height="100" 
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/100?text=No+Image'" 
          >
        </div>
      `;
      fragment.appendChild(itemDiv);
    });

    // Replace content in one go to minimize reflow
    shopContainer.innerHTML = '';
    shopContainer.appendChild(fragment);
  })
  .catch((error) => {
    console.error("Error fetching shop data:", error);

    // Show an error message in the container
    const shopContainer = document.getElementById("shop-container");
    shopContainer.innerHTML = `<p class="error">Failed to load shop data. Please try again later.</p>`;
  });
