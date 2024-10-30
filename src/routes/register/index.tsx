import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { auth } from "~/lib/auth";

export const useLogin = routeAction$(async (data, { headers, redirect }) => {
  if (data.password !== data.confirmPassword)
    return {
      success: false,
      message: "password does not match!",
    };

  try {
    await auth.api.signUpEmail({
      headers,
      body: {
        name: data.name,
        email: data.email!,
        password: data.password!,
      } as any,
    });

    throw redirect(301, "/login/");
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: (error as Error).message,
    };
  }
});

export default component$(() => {
  const action = useLogin();

  return (
    <Form action={action}>
      {!action.value?.success && action.value?.message}

      <input type="text" name="name" required value="test" />
      <input type="email" name="email" required value="test@gmail.com" />
      <input
        type="password"
        name="password"
        required
        minLength={8}
        maxLength={16}
        value="test1234"
      />
      <input
        type="password"
        name="confirmPassword"
        required
        minLength={8}
        maxLength={16}
        value="test1234"
      />
      <button type="submit">submit</button>
    </Form>
  );
});
