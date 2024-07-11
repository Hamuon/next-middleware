"use client";
import { useState } from "react";
import Login from "@/components/organisms/forms/Login";
import SignUp from "@/components/organisms/forms/SignUp";
import React from "react";

export default function page() {
  const [action, setAction] = useState<string>("login");
  return (
    <>
      {action === "login" ? (
        <Login setAction={setAction} />
      ) : (
        <SignUp setAction={setAction} />
      )}
    </>
  );
}
