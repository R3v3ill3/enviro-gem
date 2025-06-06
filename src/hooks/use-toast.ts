
import * as React from "react";

import { useToast as useToastBase } from "@/components/ui/use-toast";

export const useToast = useToastBase;

// For compatibility with sonner
export const toast = {
  success: (message: string) => {
    useToast().toast({
      title: "Success",
      description: message,
    });
  },
  error: (message: string) => {
    useToast().toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  },
};
