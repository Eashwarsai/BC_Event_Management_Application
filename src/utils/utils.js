import axios from "axios";
import { daysOfWeek, monthsOfYear } from "../constants/Constants";

export function formatMessage(date) {
  const day = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedDate = `${day} ${dayOfMonth}${getOrdinalSuffix(
    dayOfMonth
  )} ${month} ${year} at ${formattedHours}:${minutes} ${ampm}`;

  return formattedDate;
}

function getOrdinalSuffix(number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const relevantDigits = number < 30 ? number % 20 : number % 30;
  const suffixIndex = relevantDigits <= 3 ? relevantDigits : 0;
  return suffixes[suffixIndex];
}

export const isValidLogin = async(user) =>{
  const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
  console.log(data?.data.findIndex((item)=>item.email===user.email)!==-1)
  return data?.data.findIndex((item)=>item.email===user.email)!==-1
}