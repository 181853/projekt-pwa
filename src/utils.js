export const searchAddress = async (address) => {
  try {
    const response = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?access_token=" +
        process.env.REACT_APP_MAPBOX_API_KEY +
        "&autocomplete=false&country=pl&types=address&language=pl"
    );

    if (response.ok) {
      const data = await response.json();

      return data.features;
    }

    return [];
  } catch (error) {
    return [];
  }
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat("pl-PL", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
