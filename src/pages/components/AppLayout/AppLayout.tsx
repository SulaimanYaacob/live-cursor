import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell pos="absolute" padding="xl" bg="dark.8">
      {children}
    </AppShell>
  );
}

export default AppLayout;
