import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "Client-ID 0RMlVjSgfmfRLcy228KXwjhyYTOg24ox1A18PLKzFEA"; 

const searchImages = async (query, page) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query,
        page,
        per_page: 12,
        orientation: "landscape",
      },
      headers: {
        Authorization: ACCESS_KEY, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default searchImages;
