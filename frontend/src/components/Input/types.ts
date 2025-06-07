import React from "react";

export type IInputProps = {
  label?: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
