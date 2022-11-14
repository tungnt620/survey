import PocketBase from "pocketbase";
import { useCallback, useEffect, useState } from "preact/hooks";
const client = new PocketBase("https://survey.confession.vn");

export const useQuery = ({ serviceFunc, lazy = false }) => {
  const [state, setState] = useState({
    status: "",
    error: null,
    data: null,
  });

  const execute = useCallback(async () => {
    setState({ status: "loading", error: null, data: null });

    try {
      const data = await serviceFunc();

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
  }, [serviceFunc]);

  useEffect(() => {
    if (!lazy) {
      execute();
    }
  }, [execute, lazy]);

  return {
    ...state,
    execute,
  };
};

export const useCreateAnswer = (answer) => {
  return useQuery({
    serviceFunc: () => client.records.create("answer", answer),
    lazy: true,
  });
};

export const useCreatePlayerInfo = (playerInfo) => {
  return useQuery({
    serviceFunc: () => client.records.create("player", playerInfo),
    lazy: true,
  });
};

export const useUpdatePlayerInfo = (playerId, playerInfo) => {
  return useQuery({
    serviceFunc: () => client.records.update("player", playerId, playerInfo),
    lazy: true,
  });
};
