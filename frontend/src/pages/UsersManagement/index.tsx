import { CircularProgress } from "@mui/material"
import UserList from "../../components/UserList"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { listUsers } from "../../services/users"

function UsersManagement() {
  const { enqueueSnackbar } = useSnackbar()

  const {
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
    onError: (err) => {
      console.error(err)
      enqueueSnackbar("Error retrieving users", { variant: "error" });
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

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
