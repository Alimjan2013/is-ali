"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "@/components/ui/button";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
  variant?:"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
};

export function SubmitButton({ children, pendingText,variant, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" variant={variant} aria-disabled={pending}>
      {isPending ? pendingText : children}
    </Button>
  );
}
