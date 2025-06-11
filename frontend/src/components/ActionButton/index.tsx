import { Fab, type FabProps } from "@mui/material"

function ActionButton(props: FabProps) {
    const {size="medium", children} = props

    return (
        <Fab {...props} size={size} children={children} />
    )
}

export default ActionButton
