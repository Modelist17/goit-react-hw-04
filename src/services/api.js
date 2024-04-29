import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "Client-ID 0RMlVjSgfmfRLcy228KXwjhyYTOg24ox1A18PLKzFEA";

const searchParms = {
  Authorization: ACCESS_KEY,
  query: "",
  page: 1,
  per_page: 12,
  orientation: "landscape",
};

const searchImages = async (query, page) => {
  const { data } = await axios.get("/search/photos", {
    params: {
      ...searchParms,
      page,
      query,
    },
  });
  return data;
};

export default searchImages;