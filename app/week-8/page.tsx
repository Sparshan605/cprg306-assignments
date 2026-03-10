"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Home() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto p-4 text-center mt-20">
      {user ? (
        <div>
          <p className="text-xl mb-4">
            Welcome, {user.displayName}! You are logged in with GitHub.
          </p>
          <Link
            href="/week-8/shopping-list"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Go to Shopping List
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to Shopping List</h1>
          <button
            onClick={handleSignIn}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign in with GitHub
          </button>
        </div>
      )}
    </main>
  );
}