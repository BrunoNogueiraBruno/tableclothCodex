import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, listUsers, setUserRole, type SetUserRolePayload } from "../../services/users";
import { useSnackbar } from "notistack";
import type { IUser } from "../../utils/types";
import { Card, MenuItem, type SelectChangeEvent } from "@mui/material";
import Select from "../Select";
import NewUserForm from "../NewUserForm"

function UserList() {
  const { enqueueSnackbar } = useSnackbar();

  const { data: users, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: listUsers,
})

  const { mutate: mutateRole } = useMutation<IUser, Error, SetUserRolePayload>({
  mutationFn: setUserRole,
  onSuccess: () => {
    enqueueSnackbar("Role updated", { variant: "success" });
    refetch();
  },
  onError: () => {
    enqueueSnackbar("Failed to update role", { variant: "error" });
  },
})

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id)
      enqueueSnackbar("User deleted", { variant: "success" })
      refetch()

    } catch (error) {
      console.error(error)
      enqueueSnackbar("Error deleting user", { variant: "error" });
    }
  }

  return (
      <section className={`
        gap-1 flex flex-col
      `}>
        {users?.data.map((user: IUser) => (
          <Card
            variant="outlined"
            key={`user-listed-${user.id}`}
            style={{borderRight: `4px solid ${user.role === "admin" ? "red" : "transparent"}`}}
            className={`
              p-2 flex flex-col
            `}
          >
            <div className="flex w-full justify-between">
              <div children={user.username} className="font-bold" />
              <Select
                value={user.role}
                onChange={(e: SelectChangeEvent<string>) => {
                  const role = e.target.value as "admin" | "user"
                  mutateRole({ userId: user.id, role });
                }}
                sx={{ borderRadius: '9999px', height: "2rem"}}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              </div>

              <div className="flex items-end justify-between">
              <div>
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.email}</div>
              </div>

                <span
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteUser(user.id)}
                  children="Delete"
                  />
              </div>
          </Card>
        ))}

        <NewUserForm />
      </section>
  );
}

export default UserList;
