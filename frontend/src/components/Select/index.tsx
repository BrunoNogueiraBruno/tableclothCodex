import { Select as _Select } from "@mui/material";
import type { ISelectProps } from "./types";

function Select(props: ISelectProps) {

  return (
    <_Select
      {...props}
      color="primary"
    />
  );
}

export default Select;
