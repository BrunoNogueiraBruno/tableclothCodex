import { useMutation, useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import { useProtectedContext } from "../../context/ProtectedContext"
import type { ICategory, IRecipe, IRecipePayload } from "../../utils/types";
import { createRecipe, listRecipes } from "../../services/recipe";
import ActionButton from "../../components/ActionButton";
import { useSnackbar } from "notistack";
import * as yup from "yup"

import { listCategories } from "../../services/categories";
import { useState, type ChangeEvent } from "react";
import Select from "../../components/Select";
import { Card, MenuItem, type SelectChangeEvent } from "@mui/material";
import Input from "../../components/Input";

const schema = yup.object({
  title: yup
    .string()
    .required("Title is a required field")
    .max(40, "Title must be at most 40 characters"),
  ingredients: yup
    .string()
    .required("Ingredients is a required field"),
  instructions: yup
    .string()
    .required("Instructions name is a required field"),
  category: yup
    .number()
    .required("Category name is a required field")
})

const INITIAL_FORM = {title: "", ingredients: "", instructions: "", category: 0}
function Home() {
  const {user} = useProtectedContext()

  const [form,setForm]= useState(INITIAL_FORM)

  const {
    data: categories,
  } = useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: listCategories,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  const {
    data,refetch
  } = useQuery<IRecipe[], Error>({
    queryKey: ["recipes"],
    queryFn: listRecipes,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  const { mutate } = useMutation<IRecipe, Error, IRecipePayload>({
    mutationFn: createRecipe,
    onSuccess: () => {
      refetch();
    },
    onError: () => {
    },
  })

  const handleCreateRecipe = async () => {
    try {
      await schema.validate(form, {abortEarly: false})
      mutate({...form, user_id: user.id}, {
        onSuccess: () => {
          refetch()
          setForm(INITIAL_FORM)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormChange=(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {value,name} = e.target
    setForm({...form, [name]:value})
}

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2>Hello {user.first_name} {user.last_name}</h2>

      {data?.map(({title, ingredients,instructions}) => (
        <Card
          variant="outlined"
          className={`
            p-2 flex flex-col w-90
          `}
        >
          <span>{title}</span>
          <div>{ingredients}</div>
          <div>{instructions}</div>
        </Card>
      ))}

        <Card
          variant="outlined"
          className={`
            p-2 flex flex-col w-90
          `}
        >
          <Select
            label="category"
            value={form.category}
            onChange={(e: SelectChangeEvent<any>) => setForm({...form, category: e.target.value})}
            sx={{ borderRadius: '9999px', height: "2rem"}}
          >
            {categories?.map(({name,id}) => <MenuItem key={name} value={id} children={name} />)}
          </Select>
          <Input label="title" value={form.title} name="title" type="text" onChange={handleFormChange} />
          <Input label="ingredients" multiline value={form.ingredients} name="ingredients" type="textf" onChange={handleFormChange} />
          <Input label="instructions" multiline value={form.instructions} name="instructions" type="text" onChange={handleFormChange} />
        </Card>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <ActionButton
        children={<AddIcon />}
        onClick={handleCreateRecipe}
      />
      </div>
    </div>
  )
}

export default Home;
