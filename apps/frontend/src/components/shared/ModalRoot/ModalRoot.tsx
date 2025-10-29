import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconType } from "react-icons";

import { IconRoot } from "../IconRoot";

/**
 * Propriedades esperadas pelo componente ModalRoot.
 */
export interface ModalRootProps {
  /** Título exibido no cabeçalho do modal */
  title?: string;
  /** Texto do botão que abre o modal */
  btnTitle?: string;
  /** Ícone opcional a ser renderizado ao lado do título do botão */
  icon?: IconType;
  /** Descrição opcional exibida abaixo do título */
  description?: string;
  /** Conteúdo interno (formulários, texto, etc.) do modal */
  children?: React.ReactNode;
  /** Rótulo do botão de cancelamento (padrão: "Cancelar") */
  cancelLabel?: string;
  /** Rótulo do botão de confirmação (padrão: "Salvar") */
  confirmLabel?: string;
  /** Função executada ao confirmar (por exemplo, submit de formulário) */
  onConfirm?: () => void;
}

/**
 * Componente de modal genérico reutilizável.
 * Permite abrir um diálogo customizável com botão disparador,
 * cabeçalho, descrição e área de conteúdo.
 */
export const ModalRoot: React.FC<ModalRootProps> = ({
  title,
  btnTitle = "Abrir modal",
  icon,
  description,
  children,
  cancelLabel = "Cancelar",
  confirmLabel = "Salvar alterações",
  onConfirm,
}) => {
  return (
    <Dialog>
      {/* Botão que abre o modal */}
      <DialogTrigger asChild>
        <Button variant="outline">
          {/* Ícone opcional à direita do texto */}
          {btnTitle}
          {icon && <IconRoot icon={icon} className="ml-2" />}
        </Button>
      </DialogTrigger>

      {/* Conteúdo do modal */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Área principal do modal (recebe qualquer children) */}
        <div className="py-2">{children}</div>

        {/* Rodapé com ações */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </DialogClose>
          <Button type="button" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/**

<ModalRoot
title="Editar perfil"
description="Atualize suas informações pessoais abaixo."
btnTitle="Editar"
icon={FaUserEdit}
// onConfirm={() => console.log("Salvando alterações...")}
>
<form className="space-y-4"></form>
</ModalRoot>
*/
