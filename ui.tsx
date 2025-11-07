import type { FC } from "hono/jsx";

export const LoginPage: FC = ({ email, password }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f9fafb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <form
        action="/login"
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          borderRadius: "0.75rem",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Sign In</h2>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          style={{
            padding: "0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          style={{
            padding: "0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export const SignUpPage: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f9fafb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <form
        action="/signup"
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          borderRadius: "0.75rem",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          Create Account
        </h2>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          style={{
            padding: "0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          style={{
            padding: "0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Sign Up
        </button>

        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export const HomePage: FC<{ user: string }> = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f9fafb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "2rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minWidth: "300px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Welcome</h2>
        <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
          Hello {user}
        </p>
        <a
          href="/logout"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
};
