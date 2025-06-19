import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://113.161.103.134:8050/api/v1',
});

export const fetchData = async (endpoint: string) => {
  const res = await axiosInstance.get(endpoint);
  return res.data.content || res.data;
};
