/* eslint-disable @typescript-eslint/unbound-method */
import { createClient, type LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

type Presence = {
  cursor: { x: number; y: number } | null;
};

type Storage = {
  scientist: LiveObject<{ firstName: string; lastName: string }>;
};

const client = createClient({
  publicApiKey:
    "pk_dev_kTwTlly7wW5U-tD2c1ywer0qAnw2ILMeidmr2fXUlQBciariTmAHdUElV6ecrO0E",
});

export const {
  useMutation,
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  RoomContext,
  suspense,
} = createRoomContext<Presence, Storage>(client);
