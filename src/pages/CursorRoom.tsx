import { Box, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import {
  RoomProvider,
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from "liveblocks.config";
import { type ReactNode } from "react";
import Cursor from "~/components/Cursor";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

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
            color={COLORS[connectionId % COLORS.length] as string}
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

const Storage = () => {
  const scientist = useStorage((root) => root.scientist);
  const updateName = useMutation(({ storage }, nameType, newName) => {
    const mutableScientist = storage.get("scientist");
    mutableScientist.set(nameType, newName);
  }, []);

  if (!scientist) return null;

  return (
    <Stack pos="absolute" top="30%" right="40%" left="40%">
      <Title order={3} align="center" c="blue">
        Input Live Chat!
      </Title>
      <TextInput
        placeholder="First User"
        value={scientist.firstName}
        onChange={(e) => {
          updateName("firstName", e.target.value);
        }}
      />
      <TextInput
        placeholder="Second User"
        value={scientist.lastName}
        onChange={(e) => {
          updateName("lastName", e.target.value);
        }}
      />
    </Stack>
  );
};

const CursorRoom = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea h="100vh">
      <Box bg="black" sx={{ overflow: "hidden" }}>
        <RoomProvider
          id="cursor-room"
          initialPresence={{ cursor: null }}
          // initialStorage={{
          //   scientist: new LiveObject({
          //     firstName: "Roberto",
          //     lastName: "Ferrucci",
          //   }),
          // }}
        >
          <Storage />
          <LivePresence />
          <OtherPresences />
        </RoomProvider>
      </Box>
    </ScrollArea>
  );
};

export default CursorRoom;
