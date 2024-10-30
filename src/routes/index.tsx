import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { verifyJwt } from "~/util/jwt";

export const onRequest: RequestHandler = async ({
  cookie,
  next,
  redirect,
  sharedMap,
}) => {
  const token = cookie.get("token")?.value;

  if (!token) throw redirect(301, "/login/");

  try {
    const payload = await verifyJwt(token);

    sharedMap.set("userId", payload.sub);

    await next();
  } catch (error) {
    console.error(error);

    if (!token) throw redirect(301, "/login/?code=VERIFY_FAILED");
  }
};

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
