import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.logout(request, {
    redirectTo: "/auth/login",
  });
  return null;
}
