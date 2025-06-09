import { CircularProgress } from "@mui/material"
import UserList from "../../components/UserList"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { listUsers } from "../../services/users"
import type { IUser } from "../../utils/types"

function UsersManagement() {
  const { enqueueSnackbar } = useSnackbar()

  const {
    isLoading,
    refetch,
    error,
  } = useQuery<{ data: IUser[] }, Error>({
    queryKey: ["users"],
    queryFn: listUsers,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (error) {
      console.error(error)
      enqueueSnackbar("Error retrieving users", { variant: "error" });
    }
  }, [error, enqueueSnackbar])

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div  className="p-2">
      {isLoading && <CircularProgress />}
      <UserList />
    </div>
  )
}

export default UsersManagement
