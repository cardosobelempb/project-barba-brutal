import { Input } from "@/components/ui/input";
import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputText: ForwardRefRenderFunction<HTMLInputElement, InputTextProps> = (
  { children, name, ...rest },
  ref,
) => {
  return (
    <div>
      <Input
        {...rest}
        data-testid="InputTextTestId"
        id={name}
        name={name}
        ref={ref}
      />
      {children}
    </div>
  );
};

export const InputBase = forwardRef(InputText);
