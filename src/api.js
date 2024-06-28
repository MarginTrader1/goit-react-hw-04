import axios from "axios";

const ACCESS_KEY = "UPw8NjS-huZ4VlBDIIM1Zji-EyFBB8DnsTXGq8PbDP8";

export const fetchData = async () => {
  const response = await axios.get(
    `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
  );
  return response.data; //фотки
};

