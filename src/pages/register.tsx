import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "red",
          color: "white",
        }}
      >
        Sign up with Google
      </button>
    </div>
  );
}
