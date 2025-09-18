"use client";

import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Input } from "../../ui/input";
import { IconRoot } from "../IconRoot/IconRoot";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputPassword: ForwardRefRenderFunction<
  HTMLInputElement,
  InputPasswordProps
> = ({ children, name, ...rest }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-end relative h-9 p-2">
      <Input
        {...rest}
        data-testid="InputPasswordTestId"
        id={name}
        name={name}
        ref={ref}
        type={visible ? "text" : "password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-0 h-auto pr-1"
      />
      {visible ? <IconRoot icon={FiEyeOff} /> : <IconRoot icon={FiEye} />}
    </div>
  );
};

export const InputPasswordRoot = forwardRef(InputPassword);
