"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export function LoginButton({
  text,
  pendingText,
  formIsFilled,
}: {
  text: string;
  pendingText: string;
  formIsFilled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      isLoading={pending}
      className={``}
      type="submit"
      fullWidth
      color={formIsFilled ? "primary" : "danger"}
      disabled={!formIsFilled || pending}
    >
      {pending ? pendingText : text}
    </Button>
  );
}
