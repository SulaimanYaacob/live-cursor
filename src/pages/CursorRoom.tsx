import { Box, ScrollArea, Text } from "@mantine/core";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
} from "liveblocks.config";
import { type ReactNode } from "react";
import Cursor from "~/components/Cursor";

const LivePresence = () => {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {others.map(({ connectionId, presence }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ) : null
      )}
    </div>
  );
};

const OtherPresences = () => {
  const others = useOthers();
  return (
    <Text
      right="30%"
      left="30%"
      top="5%"
      pos="absolute"
      c="red"
      p="xl"
      align="center"
    >
      There are {others.length} other users with you right now!
    </Text>
  );
};

const CursorRoom = ({ children }: { children: ReactNode }) => {
  console.log("This => ", process.env.LIVEBLOCKS_PUBLIC_KEY);
  return (
    <ScrollArea h="100vh">
      <Box bg="black" sx={{ overflow: "hidden" }}>
        <RoomProvider id="cursor-room" initialPresence={{ cursor: null }}>
          <LivePresence />
          <OtherPresences />
        </RoomProvider>
      </Box>
    </ScrollArea>
  );
};

export default CursorRoom;
