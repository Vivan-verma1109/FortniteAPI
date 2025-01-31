async function getCosmeticImage(id) {
    try {
      const response = await fetch(`https://fortnite-api.com/v2/cosmetics/br/${id}`);
      const data = await response.json();
  
      if (data.status !== 200 || !data.data) {
        console.error("Error fetching cosmetic:", data);
        return;
      }
  
      console.log(`Cosmetic Name: ${data.data.name}`);
      console.log(`Image URL: ${data.data.images.icon}`);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }
  
  // Run the function
  getCosmeticImage("CID_422_Athena_Commando_F_MaskedWarrior");
  