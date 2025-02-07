document.addEventListener('DOMContentLoaded', () => {
    const shopContainer = document.querySelector('.shop-container');

    // Create a container for horizontal scrolling
    const setContainer = document.createElement('div');
    setContainer.classList.add('set-container');
    shopContainer.appendChild(setContainer);

    // Fetch grouped item data from the server
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            // Loop through each set (group)
            Object.keys(data).forEach(setName => {
                const setDiv = document.createElement('div');
                setDiv.classList.add('set-group');

                // Set title
                const setTitle = document.createElement('h2');
                setTitle.textContent = setName;
                setDiv.appendChild(setTitle);

                // Items list inside the set
                const itemsList = document.createElement('div');
                itemsList.classList.add('items-list');

                // Loop through items in this set
                data[setName].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');

                    itemDiv.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" class="item-image"/>
                        <h3>${item.name}</h3>
                        <p class="price">${item.price} V-Bucks</p>
                    `;

                    itemsList.appendChild(itemDiv);
                });

                // Append items list inside the set group
                setDiv.appendChild(itemsList);
                setContainer.appendChild(setDiv);
            });
        })
        .catch(error => {
            console.error('Error loading items:', error);
        });
});
