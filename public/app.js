document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items');
  
    // Fetch grouped item data from the server
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            // Loop through each set (group)
            Object.keys(data).forEach(setName => {
                const setDiv = document.createElement('div');
                setDiv.classList.add('set-group');
  
                // Set title
                const setTitle = document.createElement('h1');
                setTitle.textContent = setName;
                setDiv.appendChild(setTitle);
  
                // Loop through items in this set
                data[setName].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');
                    
                    itemDiv.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" class="item-image"/>
                        <h2>${item.name}</h2>
                        <p class="price">${item.price} V-Bucks</p>
                    `;
                    
                    setDiv.appendChild(itemDiv);
                });
  
                // Append set group to the container
                itemsContainer.appendChild(setDiv);
            });
        })
        .catch(error => {
            console.error('Error loading items:', error);
        });
  });
  