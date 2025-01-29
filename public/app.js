fetch('http://localhost:3000/api/shop') // Explicit URL
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((shopData) => {
    console.log('Shop data fetched:', shopData);

    const shopContainer = document.getElementById('shop-container');
    shopData.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <h2>${item.devName}</h2>
        <p>Price: ${item.finalPrice || 'Unknown'} V-Bucks</p>
        <img src="${item.image}" alt="${item.devName}" width="100">
      `;
      shopContainer.appendChild(itemDiv);
    });
  })
  .catch((error) => {
    console.error('Error fetching shop data:', error);
  });
