import { type NextPage } from "next";
import Head from "next/head";
import { AiOutlineSend } from "react-icons/ai";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { api } from "~/utils/api";
import AppLayout from "./components/AppLayout/AppLayout";

const CreatePostWizard = () => {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      ctx.posts.getAll.invalidate();
    },
  });

  if (!user) return null;

  return (
    <Stack>
      <TextInput
        placeholder="What's on your mind?"
        radius={0}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") mutate({ content: input });
          }
        }}
        disabled={isPosting}
        rightSection={
          isPosting ? (
            <Loader size="sm" />
          ) : (
            <ActionIcon
              color={input ?? "blue"}
              variant="transparent"
              onClick={() => mutate({ content: input })}
              radius={0}
              disabled={input === ""}
            >
              <AiOutlineSend size="18px" />
            </ActionIcon>
          )
        }
      />
    </Stack>
  );
};

const PostView = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  dayjs.extend(relativeTime);

  if (isLoading)
    return (
      <Loader variant="bars" pos="absolute" top="35vh" w="100%" h="100%" />
    );

  if (!data)
    return (
      <Text c="red" align="center">
        No data
      </Text>
    );

  return (
    <ScrollArea h="500px">
      {data.map((fullpost) => {
        return (
          <Stack
            key={fullpost.post.id}
            py="xs"
            px="lg"
            sx={{
              borderBottom: "1px solid white",
              borderRight: "1px solid white",
              borderLeft: "1px solid white",
            }}
          >
            <Group noWrap>
              <Avatar radius="xl" src={fullpost.user.profilePicture} />
              <Stack spacing={0}>
                <Group spacing="5px">
                  <Text fw={500} c="blue">
                    {`@${fullpost.user.username}`}
                  </Text>
                  <Text c="gray">·</Text>
                  <Text c="gray">
                    {dayjs(fullpost.post.createdAt).fromNow()}
                  </Text>
                </Group>
                <Text c="gray.0">{fullpost.post.content}</Text>
              </Stack>
            </Group>
          </Stack>
        );
      })}
    </ScrollArea>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  //! Note that this is not a good way to do this. This is just for demo purposes.
  return (
    <AppLayout>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100%">
        <Stack justify="space-between" w="100%" h="85%" maw="500px">
          <Stack pos="relative" spacing="0">
            {user.isSignedIn ? (
              <SignOutButton>
                <Button
                  leftIcon={
                    <Avatar
                      radius="lg"
                      size="sm"
                      src={user.user.profileImageUrl}
                      alt="Profile Image"
                    />
                  }
                  color="gray.0"
                  radius="0"
                  variant="outline"
                >
                  Sign out
                </Button>
              </SignOutButton>
            ) : (
              <SignInButton>
                <Button color="gray.0" radius="0" variant="outline">
                  Sign In
                </Button>
              </SignInButton>
            )}
            <PostView />
            <CreatePostWizard />
          </Stack>
        </Stack>
      </Center>
    </AppLayout>
  );
};

export default Home;
