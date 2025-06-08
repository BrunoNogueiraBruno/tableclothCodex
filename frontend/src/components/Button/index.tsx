import { Button as _Button } from "@mui/material";
import type { IButtonProps } from "./types";

function Button(props: IButtonProps) {
  const { className = "" } = props;

  return (
    <_Button
      {...props}
      className={`w-60 ${className}`}
      color="primary"
    />
  );
}

export default Button;
