import PocketBase from "pocketbase";
import { useCallback, useState } from "preact/hooks";
const client = new PocketBase("https://survey.confession.vn");

export const useQuery = ({ serviceFunc }) => {
  const [state, setState] = useState({
    status: "",
    error: null,
    data: null,
  });

  const execute = useCallback(
    async (...args) => {
      setState({ status: "loading", error: null, data: null });

      try {
        const data = await serviceFunc(...args);

        setState({
          status: "success",
          error: null,
          data,
        });
      } catch (error) {
        setState({
          status: "error",
          error,
          data: null,
        });
      }
    },
    [serviceFunc]
  );

  return {
    ...state,
    execute,
  };
};

export const useCreateAnswer = () => {
  return useQuery({
    serviceFunc: (answer) => client.records.create("answer", answer),
  });
};

export const useCreatePlayerInfo = () => {
  return useQuery({
    serviceFunc: (playerInfo) => client.records.create("player", playerInfo),
  });
};

export const useUpdatePlayerInfo = () => {
  return useQuery({
    serviceFunc: (playerId, playerInfo) =>
      client.records.update("player", playerId, playerInfo),
  });
};
