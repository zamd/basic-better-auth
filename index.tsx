import { APIError, betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { LoginPage, SignUpPage, HomePage } from "./ui";

import { Hono } from "hono";

const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 1,
  },
  emailVerification: {
    sendVerificationEmail: async (data, request) => {
      console.log("Sending verificaiton email");
    },
  },
});

const app = new Hono();

app.get("/", (c) => {
  const email = c.req.query("email");
  return c.html(<LoginPage email={email} />);
});

app.get("/home", async (c) => {
  const headers = c.req.header();

  const data = await auth.api.getSession({ headers });
  if (!data?.user) return c.redirect("/");

  const { email } = data.user;

  return c.html(<HomePage user={email} />);
});

app.get("/logout", async (c) => {
  const headers = c.req.header();
  const resp = await auth.api.signOut({
    headers,
    returnHeaders: true,
  });

  return c.redirect("/");
});

app.post("/verify", async (c) => {
  const { email } = await c.req.json();
  const result = await auth.api.sendVerificationEmail({
    body: {
      email,
      callbackURL: "/verified",
    },
  });
  return c.json(result);
});

app.get("/signup", async (c) => {
  return c.html(<SignUpPage />);
});

app.post("/signup", async (c) => {
  const contentType = c.req.header("content-type") || "";

  let body: Record<string, any> = {};

  if (contentType.includes("application/json")) {
    body = await c.req.json();
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await c.req.formData();
    body = Object.fromEntries(form.entries());
  }

  const { name, email, password } = body;

  if (!email || !password) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  await auth.api.signUpEmail({
    body: { name, email, password },
  });

  return c.redirect(`/?email=${email}`);
});

app.post("/login", async (c) => {
  const form = await c.req.formData();
  const body = Object.fromEntries(form.entries());
  const { email, password } = body;
  if (!email || !password) return c.redirect("/");

  try {
    const resp = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/home",
      },
      returnHeaders: true,
    });

    resp.headers.forEach((v, k) => c.res.headers.append(k, v));

    if (resp.response.redirect) {
      return c.redirect(resp.response.url || "/");
    }
  } catch (error) {
    if (error instanceof APIError) {
      return c.redirect("/");
    }
  }
});

export default app;
