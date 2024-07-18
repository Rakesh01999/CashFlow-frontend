import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://cash-flow-backend-lilac.vercel.app"
});

const useAxiospublic = () => {
  return axiosPublic;
};

export default useAxiospublic;