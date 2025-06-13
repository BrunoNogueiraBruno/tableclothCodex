import { InputAdornment, TextField } from "@mui/material"
import type { IInputProps } from "./types"

function Input(props: IInputProps) {
    const {size = "small", minimal = false, Icon = false} = props

    let className = "w-60"
    let sx = {}
    let slotProps = {}

    if (minimal) {
        className = "w-60"

        const sxStyle = {
            border: 'none',
            borderBottom: "1px solid gray",
        }

        sx = {
            '& .MuiOutlinedInput-root': {
            '& fieldset': sxStyle,
            '&:hover fieldset': sxStyle,
            '&.Mui-focused fieldset': sxStyle,
            },
        }
    }

    if (Icon) {
        slotProps={
            input: {
                startAdornment: (
                <InputAdornment position="start">
                    <Icon />
                </InputAdornment>
                ),
            },
        }
    }

    return (
            <TextField
                variant="outlined"
                sx={sx}
                className={`${className} ${props.className}`}
                size={size}
                slotProps={slotProps}
                {...props}
            />
    )
}

export default Input