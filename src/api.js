import axios from "axios";

const ACCESS_KEY = "UPw8NjS-huZ4VlBDIIM1Zji-EyFBB8DnsTXGq8PbDP8";

export const fetchData = async (searchWord, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?&query=${searchWord}&client_id=${ACCESS_KEY}&page=${page}`
  );
  return response.data; //фотки
};
