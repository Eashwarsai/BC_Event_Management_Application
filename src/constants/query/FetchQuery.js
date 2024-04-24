import axios from "axios";
import { useQuery } from "react-query";

const FetchCurrentEvents = () =>{
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/Current`);
}
const FetchFreezedEvents = () =>{
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/Freezed`);
}
const FetchFinishedEvents = async() =>{
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Finished`);
}
export const CurrentEvents = () => {
  return useQuery('currentEvents',FetchCurrentEvents);
}
export const useFreezedEvents = () => {
  return useQuery('freezedEvents',FetchFreezedEvents);
}
export const useFinishedEvents = () => {
  return useQuery('finishedEvents',FetchFinishedEvents);
}