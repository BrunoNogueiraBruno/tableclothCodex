import { TextField } from "@mui/material"
import type { IInputProps } from "./types"

function Input(props: IInputProps) {
    return (
            <TextField
                {...props}
                variant="outlined"
                className="w-60"
                size="small"
            />
    )
}

export default Input