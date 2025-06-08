import { TextField } from "@mui/material"
import type { IInputProps } from "./types"

function Input(props: IInputProps) {
    const {size = "small"} = props
    return (
            <TextField
                {...props}
                variant="outlined"
                className={`w-60 ${props.className}`}
                size={size}
            />
    )
}

export default Input