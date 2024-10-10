import {
  MetaFunction,
  redirect,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import MyAppShell from "../layouts/AppShell";
import { authenticator } from "~/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/login",
  });

  return redirect("/Dashboard");
}

export default function Index() {
  return (
    <MyAppShell>
      <h1>Hello World</h1>
    </MyAppShell>
  );
}
