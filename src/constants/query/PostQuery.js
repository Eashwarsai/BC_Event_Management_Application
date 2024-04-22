import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const addEvent = async (data) => {
  return await axios.post("http://localhost:5000/Current", data);
};
const updateFreezedEvent = async (data) => {
  console.log(data)
  return await axios.put(`http://localhost:5000/Freezed/${data.id}`, data);
};
const addFreezedEvent = async (data) => {
  return await axios.post("http://localhost:5000/Freezed", data);
};
const addFinishedEvent = async (data) => {
  return await axios.post("http://localhost:5000/Finished", data);
};
const addSuggestion = async (data) => {
  return await axios.put(`http://localhost:5000/Current/${data.id}`, data);
};
const deleteCurrentEvent = async (data) => {
  return await axios.delete(`http://localhost:5000/Current/${data.id}`);
};
const deleteFreezedEvent = async (data) => {
  return await axios.delete(`http://localhost:5000/Freezed/${data.id}`);
};
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(addEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentEvents");
    },
  });
};
export const useAddFreezedEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(addFreezedEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("freezedEvents");
    },
  });
};
export const useUpdateFreezedEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFreezedEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("freezedEvents");
    },
  });
};
export const useAddFinishedEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(addFinishedEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("finishedEvents");
    },
  });
};
export const useAddSuggestion = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuggestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentEvents");
    },
  });
};
export const useDeleteCurrentEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCurrentEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentEvents");
    },
  });
};
export const useDeleteFreezedEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFreezedEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("freezedEvents");
    },
  });
};
