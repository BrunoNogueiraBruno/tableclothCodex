import { useEffect, useState } from "react"
import TitleIcon from "@mui/icons-material/Title"
import PersonIcon from "@mui/icons-material/Person"
import LinkIcon from "@mui/icons-material/Link"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import AddIcon from "@mui/icons-material/Add"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Card } from "@mui/material"
import { v4 as uuidv4 } from "uuid"

import { type IProfileContact, type IProfile, type IProfileRes } from "../../utils/types"
import { listProfile, setProfile } from "../../services/profile"
import Button from "../../components/Button"
import { useProtectedContext } from "../../context/ProtectedContext"
import Input from "../../components/Input"

const newContact = (): IProfileContact => ({
  id: uuidv4(),
  platform: "",
  name: "",
  url: "",
})

function Profile() {
  const { user } = useProtectedContext()

  const [contactList, setContactList] = useState<IProfileContact[]>([])
  const [onEdit, setOnEdit] = useState(false)

  const { data, refetch } = useQuery<IProfileRes, Error>({
  queryKey: ["profile"],
  queryFn: listProfile,
  staleTime: 0,
  refetchOnWindowFocus: false,
});

useEffect(() => {
  if (data) {
    try {
      let contacts = JSON.parse(data.contact) as IProfileContact[];
      if (!contacts.length) contacts = [newContact()]
      setContactList(contacts)
    } catch (error) {
      console.error("Failed to parse contact JSON", error);
      setContactList([]);
    }
  }
}, [data]);

  const { mutate } = useMutation<IProfileRes, Error, IProfile>({
    mutationFn: setProfile,
    onSuccess: () => {
      refetch()
      setOnEdit(false)
    },
  })

  const handleInputChange = (id: string, key: keyof IProfileContact, value: string) => {
    setContactList((prev) =>
      prev.map((contact) => (contact.id === id ? { ...contact, [key]: value } : contact))
    )
  }

  const handleDeleteContact = (id: string) => {
    setContactList((prev) => prev.filter((contact) => contact.id !== id))
  }

  const handleSaveContact = () => {
    mutate({ contact: contactList })
  }

  return (
    <div className="p-2">
      <div className="flex flex-col w-full min-h-30 p-2 gap-4 items-center">
        <div className="text-xl border-b-1 border-gray-400 w-full justify-between flex items-end">
          <b>{`${user.first_name} ${user.last_name}`}</b>
          <span
            className="text-[.8em] cursor-pointer"
            onClick={() => {
              if (onEdit && data) {
                setContactList(JSON.parse(data.contact))
              }
              setOnEdit(!onEdit)
            }}
          >
            {onEdit ? "Cancel" : "Edit"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1 justify-center items-center">
          {contactList.map(({ platform, name, url, id }) => (
            <Card
              key={id}
              className="relative flex items-center gap-1 w-[65vw] p-4 justify-center flex-col"
              variant="outlined"
              onClick={() => {
                if (!url) {
                    setOnEdit(true)
                    return
                }

                if (!onEdit) window.location.href = url
              }}
            >
              <div className="flex items-center gap-2" style={{ flexDirection: onEdit ? "column" : "row" }}>
                {onEdit && (
                  <DeleteOutlinedIcon
                    onClick={() => handleDeleteContact(id)}
                    className="absolute top-3 left-3 text-gray-500 hover:text-red-500 cursor-pointer"
                  />
                )}

                {url ? (
                  <img
                    className="grayscale"
                    src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
                    alt="Favicon"
                    style={{ width: 40, height: 40 }}
                  />
                ) : (
                  <p className="text-gray-400 italic">New contact</p>
                )}

                <div className="flex flex-col leading-[1]">
                  {onEdit ? (
                    <>
                      <Input
                        value={platform}
                        minimal
                        Icon={TitleIcon}
                        type="text"
                        placeholder="Platform"
                        onChange={(e) => handleInputChange(id, "platform", e.target.value)}
                      />
                      <Input
                        value={name}
                        minimal
                        Icon={PersonIcon}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => handleInputChange(id, "name", e.target.value)}
                      />
                      <Input
                        value={url}
                        minimal
                        Icon={LinkIcon}
                        type="text"
                        placeholder="URL"
                        onChange={(e) => handleInputChange(id, "url", e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <div>{platform}</div>
                      <div>{name}</div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {onEdit && (
          <div className="flex w-[65vw] justify-center gap-4">
            <Button
              children={<AddIcon />}
              variant="outlined"
              className="w-fit"
              onClick={() => setContactList([...contactList, newContact()])}
            />
            <Button
                children="Save"
                variant="contained"
                className="w-full"
                onClick={handleSaveContact}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
