import { Button as _Button } from "@mui/material";
import type { IButtonProps } from "./types";

function Button(props: IButtonProps) {
  const { className = "", ...rest } = props;

  return (
    <_Button
      {...rest}
      className={`w-60 h-10 ${className}`}
      color="primary"
    />
  );
}

export default Button;
