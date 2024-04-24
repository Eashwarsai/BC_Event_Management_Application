import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const addEvent = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Current`, data);
};
const updateFreezedEvent = async (data) => {
  return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Freezed/${data.id}`, data);
};
const addFreezedEvent = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Freezed`, data);
};
const addFinishedEvent = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Finished`, data);
};
const addSuggestion = async (data) => {
  return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Current/${data.id}`, data);
};
const deleteCurrentEvent = async (data) => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Current/${data.id}`);
}
const deleteFreezedEvent = async (data) => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Freezed/${data.id}`);
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
