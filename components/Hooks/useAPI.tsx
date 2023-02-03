"use client";

import useSWRMutation from "swr/mutation";
import { fetcher } from "../Fetcher";

export default function useAPI(url: string) {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `https://api.singer.systems/${url}`,
    fetcher
  );
  return { trigger, isMutating, data, error };
}
