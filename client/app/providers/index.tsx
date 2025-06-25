import { ProviderTanstack } from "@/providers/tanstack";
import { ProviderAuth } from "@/contexts/AuthContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProviderTanstack>
      <ProviderAuth>{children}</ProviderAuth>
    </ProviderTanstack>
  );
};
