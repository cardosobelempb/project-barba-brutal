// components/form/FormInput.tsx
"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useMemo } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import PasswordInput from "../PasswordInput";

type InputRootProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  asPassword?: boolean;
};

export function InputRoot<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  asPassword = false,
}: InputRootProps<T>) {
  const InputComponent = useMemo(() => {
    if (asPassword) return PasswordInput;
    return Input;
  }, [asPassword]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputComponent {...field} type={type} placeholder={placeholder} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
