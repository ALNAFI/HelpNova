"use client";

import { Button } from "@/components/ui/button";
import { useChatbot } from "@/context/chatbot-provider";
import { cn } from "@/utils/cn";

type OpenChatbotButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  "aria-label"?: string;
};

export function OpenChatbotButton({
  children,
  className,
  variant = "primary",
  size = "lg",
  "aria-label": ariaLabel,
}: OpenChatbotButtonProps) {
  const { open, isOpen } = useChatbot();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      aria-label={ariaLabel}
      aria-pressed={isOpen}
      onClick={(event) => {
        open(event.currentTarget);
      }}
    >
      {children}
    </Button>
  );
}
