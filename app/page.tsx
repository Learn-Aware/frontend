"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LAAILoading from "@/components/common/LAAILoading";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleNavigation = (role: "guest" | "student" | "api") => {
    router.push(`/${role}`);
  };

  if (!isLoaded) {
    return <LAAILoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-12 row-start-2 items-center w-full max-w-screen-xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Welcome to{" "}
              <span className="text-[hsl(var(--laai-blue))]">LAAI</span>{" "}
              Personalized Tutoring Agent
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you&apos;re a curious learner or an experienced educator,
              LAAI offers a seamless platform for education and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["guest", "student", "api"].map((role) => (
              <div
                key={role}
                className="rounded-lg border bg-card/80 backdrop-blur-sm text-card-foreground shadow-sm h-[320px] max-w-[280px] mx-auto w-full"
              >
                <div className="p-8 flex flex-col items-center gap-6 h-full">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">
                    {role === "api"
                      ? "Create an API Key"
                      : `Join as a ${
                          role.charAt(0).toUpperCase() + role.slice(1)
                        }`}
                  </h3>
                  <div className="relative w-40 h-40 overflow-hidden">
                    <Image
                      src={`/images/${role}.svg`}
                      alt={role}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow" />
                  {!user ? (
                    <Button
                      className="bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white w-full transition-colors"
                      asChild
                    >
                      <SignInButton />
                    </Button>
                  ) : (
                    <Button
                      className="bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white w-full transition-colors"
                      onClick={() =>
                        handleNavigation(role as "guest" | "student" | "api")
                      }
                    >
                      {role === "api" ? "Generate API Key" : "Get Started"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
