import React from "react";
import type { TextFieldProps } from "@mui/material"

export type IInputProps = TextFieldProps & {
  label?: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
