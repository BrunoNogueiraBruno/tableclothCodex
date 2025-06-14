import { Card, CircularProgress } from "@mui/material"
import UserList from "../../components/UserList"
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { useQuery, useMutation } from "@tanstack/react-query"
import { createCategory, editCategory, listCategories,deleteCategory } from "../../services/categories"
import type { ICategoryPayload, ICategory } from "../../utils/types"
import Button from "../../components/Button"
import Input from "../../components/Input"

type IOnEdit = {
  state:boolean,
  id: number,
  value: string
}

const INITIAL_ON_EDIT = {state: false, id: 0,value:""}

function Categories() {
  const { enqueueSnackbar } = useSnackbar()
  const [newCat,setNewCat] = useState("")
  const [onEdit,setOnEdit] = useState<IOnEdit>(INITIAL_ON_EDIT)

  const {
    isLoading,
    refetch,
    data,
    error,
  } = useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: listCategories,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  const { mutate } = useMutation<ICategory, Error, ICategoryPayload>({
    mutationFn: createCategory,
    onSuccess: () => {
      refetch();
      enqueueSnackbar("Category created", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Failed to create category", { variant: "error" });
    },
  })

  const { mutate: editCat } = useMutation<ICategory, Error, ICategory>({
    mutationFn: editCategory,
    onSuccess: () => {
      refetch();
      enqueueSnackbar("Category edited", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Failed to edit category", { variant: "error" });
    },
  })

  const { mutate: mutateDeleteCat } = useMutation<ICategory, Error, {id: number}>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      enqueueSnackbar("Failed to delete category", { variant: "error" });
    },
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

  const handleCreateCategory = () => {
    if (newCat === "") return

    mutate({name: newCat})
    setNewCat("")
  }

  return (
    <div  className="p-2 flex justify-center flex-col items-center gap-2">
      {isLoading && <CircularProgress />}
      
      {
        data?.map(({name,id}) => {
          const handleSetEdit = () => {
            if (!onEdit.state) {
              setOnEdit({state: true, id, value: name})
              return
            }
            setOnEdit(INITIAL_ON_EDIT)
          }
          
          return (
          <Card
              key={id}
              className="relative flex items-center gap-1 w-[65vw] p-3 justify-between"
              variant="outlined"
            >
                {onEdit.id === id ? (
                  <Input
                    value={onEdit.value}
                    onChange={(e) => setOnEdit({...onEdit, value: e.target.value})}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        editCat({id: onEdit.id, name: onEdit.value})
                        setOnEdit(INITIAL_ON_EDIT)
                      }
                    }}
                  />
                ) : name}
                <div className="flex gap-2">
                <EditIcon onClick={handleSetEdit} />
                <DeleteIcon
                  onClick={() => mutateDeleteCat({id})}
                />
              </div>
            </Card>)
          })}

      <Card
        className="relative flex flex-col items-center gap-1 w-[65vw] p-4 justify-between"
        variant="outlined"
        >
      <Input
        label="New category"
        value={newCat}
        onChange={(e) => setNewCat(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleCreateCategory()
          }
        }}
      />

      <Button
        variant="text"
        onClick={handleCreateCategory}
      >
        Adicionar
      </Button>
      </Card>
    </div>
  )
}

export default Categories
