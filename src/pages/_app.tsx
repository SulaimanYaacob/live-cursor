import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
