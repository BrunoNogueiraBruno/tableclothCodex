import { useQuery } from '@tanstack/react-query';
import type { IAuthDataResponse } from '../utils/types';
import { info } from '../services/auth';

export function useAuth() {
  return useQuery<IAuthDataResponse, Error>({
  queryKey: ['info'],
  queryFn: async () => {
    const { data } = await info()
    return data;
  },
  retry: false,
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000,
})

}
