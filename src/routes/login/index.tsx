import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { auth } from "~/lib/auth";
import { signJwt } from "~/util/jwt";

export const useLogin = routeAction$(
  async (data, { cookie, headers, redirect }) => {
    try {
      const res = await auth.api.signInEmail({
        headers,
        body: {
          email: data.email,
          password: data.password,
        } as any,
      });

      const token = await signJwt({
        sub: res.user.id,
        sessionId: res.session.id,
        name: res.user.name,
      });

      cookie.set("token", token, {
        secure: true,
        path: "/",
        httpOnly: true,
      });

      throw redirect(301, "/");
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }
);

export default component$(() => {
  const action = useLogin();

  return (
    <Form action={action}>
      <input type="email" name="email" required value="test@gmail.com" />
      <input
        type="password"
        name="password"
        required
        minLength={8}
        maxLength={16}
        value="test1234"
      />
      <button type="submit">submit</button>
    </Form>
  );
});
