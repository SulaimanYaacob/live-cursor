import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

type Presence = {
  cursor: { x: number; y: number } | null;
};

const client = createClient({
  publicApiKey:
    "pk_dev_kTwTlly7wW5U-tD2c1ywer0qAnw2ILMeidmr2fXUlQBciariTmAHdUElV6ecrO0E",
});

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { RoomProvider, useOthers, useUpdateMyPresence } =
  createRoomContext<Presence>(client);

// // eslint-disable-next-line @typescript-eslint/unbound-method
// export const { RoomProvider, useUpdateMyPresence, useOthers } =
//   createRoomContext<Presence>(client);
