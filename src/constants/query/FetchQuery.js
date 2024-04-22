import axios from "axios";
import { useQuery } from "react-query";

const FetchCurrentEvents = () =>{
  return axios.get('http://localhost:5000/Current');
}
const FetchFreezedEvents = () =>{
  return axios.get('http://localhost:5000/Freezed');
}
const FetchFinishedEvents = async() =>{
  return await axios.get('http://localhost:5000/Finished');
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