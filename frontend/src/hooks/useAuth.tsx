import { useQuery } from '@tanstack/react-query';
import baseApi from "../services";
import type { IAuthDataResponse } from '../utils/types';

export function useAuth() {
  return useQuery<IAuthDataResponse, Error>({
  queryKey: ['info'],
  queryFn: async () => {
    const { data } = await baseApi.get('/info');
    return data;
  },
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000,
})

}
