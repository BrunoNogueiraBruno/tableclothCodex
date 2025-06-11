import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import type { IProfile } from "../../utils/types"
import { listProfile, setProfile } from "../../services/profile"
import Button from "../../components/Button"

function Profile() {
    const { enqueueSnackbar } = useSnackbar()

    const {
        refetch,
        data,
        error,
    } = useQuery<{ data: IProfile[] }, Error>({
        queryKey: ["users"],
        queryFn: listProfile,
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

    console.log(data)

    const handleCreate = async () => {
        try {
            const res = await setProfile({contact: [{plataform: "linkedin", name:"NogueiraBrunoNogueira", url:"google.com"}]})
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div  className="p-2">
            Perfil

            <Button children="Create" onClick={handleCreate} />
        </div>
    )
}

export default Profile
