"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { Input } from "../../ui/input";
import { IconRoot } from "../IconRoot/IconRoot";

type PasswordInputProps = {} & React.ComponentProps<typeof Input>;

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-end relative h-9 p-2">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-0 h-auto pr-1"
      />
      {visible ? <IconRoot icon={FiEyeOff} /> : <IconRoot icon={FiEye} />}
    </div>
  );
}
