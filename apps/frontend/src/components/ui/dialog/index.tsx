import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./primitive";

export type BaseDialogProps = {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

type DialogProps = BaseDialogProps & {
  title: string;
  description?: string;
  content: ReactNode;
};

export const DialogRoot = ({
  children,
  title,
  description,
  content,
  open,
  setOpen,
}: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  );
};
