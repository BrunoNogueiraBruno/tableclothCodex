import { useQuery } from '@tanstack/react-query';
import baseApi from "../services";

export function useAuth() {
  return useQuery<boolean, Error>({
  queryKey: ['info'],
  queryFn: async () => {
    const { data } = await baseApi.get('/info');
    return data.authenticated;
  },
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000,
});

}
