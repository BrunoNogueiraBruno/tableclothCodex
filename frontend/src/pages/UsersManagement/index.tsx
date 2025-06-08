import { useMutation, useQuery } from "@tanstack/react-query";
import { listUsers, setUserRole, type SetUserRolePayload } from "../../services/users";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import type { IUser } from "../../utils/types";
import { Card, MenuItem, type SelectChangeEvent } from "@mui/material";
import Select from "../../components/Select";

function Home() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
    onError: (err) => {
      console.error(err)
      enqueueSnackbar("Error retrieving users", { variant: "error" });
    },
    staleTime: 0, // força sempre pegar dados frescos
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateRole } = useMutation<IUser, Error, SetUserRolePayload>({
  mutationFn: setUserRole,
  onSuccess: () => {
    enqueueSnackbar("Role updated", { variant: "success" });
    refetch();
  },
  onError: () => {
    enqueueSnackbar("Failed to update role", { variant: "error" });
  },
});

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="h-[90vh] p-2">
      {isLoading && <p>Carregando usuários...</p>}

      <section className={`
        p-2h-full gap-1 flex flex-col
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

              <div>
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.email}</div>
              </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default Home;
