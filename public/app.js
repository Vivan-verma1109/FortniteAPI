document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items');

    // Fetch grouped item data from the server
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(setName => {
                const setDiv = document.createElement('div');
                setDiv.classList.add('set-group');

                const setTitle = document.createElement('h2');
                setTitle.textContent = setName;
                setDiv.appendChild(setTitle);

                const itemsList = document.createElement('div');
                itemsList.classList.add('items-list');

                data[setName].forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('item');

                    let variationsHTML = '';
                    if (item.variations.length > 0) {
                        variationsHTML = `<p class="variations">Variants: ${item.variations.length} options</p>`;
                    }

                    itemDiv.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" class="item-image"/>
                        <h3>${item.name}</h3>
                        <p class="price">${item.price} V-Bucks</p>
                        ${variationsHTML}
                    `;

                    itemsList.appendChild(itemDiv);
                });

                setDiv.appendChild(itemsList);
                itemsContainer.appendChild(setDiv);
            });
        })
        .catch(error => {
            console.error('Error loading items:', error);
        });
});
