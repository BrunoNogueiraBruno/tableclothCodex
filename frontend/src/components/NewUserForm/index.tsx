import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import type { IUser } from "../../utils/types";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { createUser, listUsers } from "../../services/users";
import Input from "../Input";
import * as yup from "yup"

import AddIcon from "@mui/icons-material/Add"
import { useState } from "react";
import Button from "../Button";

interface Form {
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
  confirmPassword: string
}

type FormErrors = Partial<Form>

const schema = yup.object({
  username: yup
    .string()
    .required("Username is a required field")
    .matches(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")
    .max(15, "Username must be at most 15 characters"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm password is a required field")
    .oneOf([yup.ref("password")], "Passwords must match"),

  email: yup
    .string()
    .required("Email is a required field")
    .email("Invalid email"),

  first_name: yup
    .string()
    .required("First name is a required field")
    .max(15, "First name must be at most 15 characters"),

  last_name: yup
    .string()
    .required("Last name is a required field")
    .max(15, "Last name must be at most 15 characters"),
});

const initialForm = {username: "", password: "", email:"", first_name:"", last_name:"",confirmPassword:""}

function NewUserForm() {
  const { enqueueSnackbar } = useSnackbar()
  const { refetch } = useQuery({queryKey: ['users'], queryFn: listUsers})
  const [form, setForm] = useState<Form>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [accordionExpanded,setAccordionExpanded] = useState<boolean>(false)

  const { mutate } = useMutation<IUser, Error, IUser>({
  mutationFn: createUser,
  onSuccess: () => {
    enqueueSnackbar("New user created", { variant: "success" });
    refetch()
    setForm(initialForm)
    setAccordionExpanded(false)
  },
  onError: () => {
    enqueueSnackbar("Failed to create user", { variant: "error" });
  },
})

const handleCreateUser = async () => {
    try {
        console.log(form)
      await schema.validate(form, { abortEarly: false })
      setErrors({})

      mutate(form, {
        onSuccess: () => {
          enqueueSnackbar("User created", {variant:"success"})
          refetch()
          setForm(initialForm)
        },
        onError: (error) => {
          throw error
        },
      })
    } catch (validationError) {
          console.error(`User creation error: ${validationError}`)
    
          if (validationError instanceof yup.ValidationError) {
            const errs: { [key: string]: string } = {}
            validationError.inner.forEach(err => {
              if (err.path) errs[err.path] = err.message
            })
            setErrors(errs)
    
            return
          }
    }
}

const handleFormChange=(e:any) => {
    const {value,name} = e.target
    setForm({...form, [name]:value})
}

const handleAccordionToggle = (_: any, isExpanded: boolean) => {
    setAccordionExpanded(isExpanded)
    if (!isExpanded) {
      setForm(initialForm)
      setErrors({})
    }
  }

const submitDisabled = Object.values(form).some((val) => !val || val === "") || form.password !== form.confirmPassword

  return (
      <section>
        <Accordion expanded={accordionExpanded} onChange={handleAccordionToggle}>
            <AccordionSummary>
                <AddIcon />
                <span className="top-0.5 left-1 relative">Create new User</span>
            </AccordionSummary>
            <AccordionDetails>
                <form className="flex flex-col gap-7 py-4" onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateUser()
                }}>
                    <div className="flex flex-col gap-2 items-center">
                        <Input label="username" value={form.username} name="username" type="text" onChange={handleFormChange} />
                        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                        <Input label="password" value={form.password} name="password" type="password" onChange={handleFormChange} />
                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <Input label="confirm password" value={form.confirmPassword} name="confirmPassword" type="password" onChange={handleFormChange} />
                        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <Input label="email" name="email" value={form.email} type="text" onChange={handleFormChange} />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <Input label="first name" name="first_name" value={form.first_name} type="text" onChange={handleFormChange} />
                        {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
                        <Input label="last name" name="last_name" value={form.last_name} type="text" onChange={handleFormChange} />
                        {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                    <Button
                        disabled={submitDisabled}
                        variant="contained"
                        children="Confirm"
                        type="submit"
                    />
                    </div>

                </form>
            </AccordionDetails>
        </Accordion>
      </section>
  );
}

export default NewUserForm;
