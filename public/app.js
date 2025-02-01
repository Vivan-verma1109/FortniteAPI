document.addEventListener('DOMContentLoaded', () => {
  const itemsContainer = document.getElementById('items');

  // Fetch item data from the server
  fetch('/items')
      .then(response => response.json())
      .then(data => {
          // Loop through each item and create HTML for them
          data.forEach(item => {
              const itemDiv = document.createElement('div');
              itemDiv.classList.add('item');
              
              itemDiv.innerHTML = `
                  <img src="${item.imageUrl}" alt="${item.name}" class="item-image"/>
                  <h2>${item.name}</h2>
                  <p class="price">${item.price} V-Bucks</p>
              `;
              
              itemsContainer.appendChild(itemDiv); // Add item to the container
          });
      })
      .catch(error => {
          console.error('Error loading items:', error);
      });
});
