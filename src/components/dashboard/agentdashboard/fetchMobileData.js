
const fetchMobileData = async () => {
    const response = await fetch('https://cash-flow-backend-lilac.vercel.app/mobile');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

export default fetchMobileData