import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth.server";
import { getSession, commitSession } from "session.server";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  TextInput,
  PasswordInput,
  Button,
  Alert,
  Paper,
  Group,
  Flex,
  Stack,
  Image,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import logo from "~/assets/img/logo.png";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);

  return json(
    { error },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export async function action({
  request,
}: ActionFunctionArgs): Promise<Response> {
  const result = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  });

  return result;
}

export default function Auth() {
  const actionData = useActionData<typeof action>();
  const { error } = useLoaderData<typeof loader>();
  const errorIcon = <IconInfoCircle />;

  return (
    <Flex justify="center" h={"100vh"}>
      <Stack justify="center">
        <Group justify="center">
          <Image src={logo} w={200} />
        </Group>
        <Paper withBorder p="md" radius="md" w={500}>
          {error && (
            <Alert
              mb="md"
              variant="light"
              color="red"
              title="ERROR"
              icon={errorIcon}
            >
              {error.message}
            </Alert>
          )}
          <Form method="POST">
            <TextInput
              name="username"
              label="Username"
              placeholder="Username"
              required
            />
            <PasswordInput
              mt="md"
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              required
            />
            <Group justify="right">
              <Button mt="md" type="submit">
                Submit
              </Button>
            </Group>
            {actionData && <Alert color="red">Unable to sign in</Alert>}
          </Form>
        </Paper>
      </Stack>
    </Flex>
  );
}
