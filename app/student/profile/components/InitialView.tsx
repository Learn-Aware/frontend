import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

const InitialView = ({ handleStartQuiz }: { handleStartQuiz: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center mb-4">
          Welcome to LAAI! Let&apos;s Personalize Your Learning Journey
        </CardTitle>
      </CardHeader>
      <p className="text-lg text-center text-gray-600 mb-6">
        To provide you with the best possible experience, we&apos;d like to
        learn a bit about your goals, preferences, and background. Please take a
        few moments to answer the following questions. Your responses will help
        us create a customized learning plan just for you!
      </p>
      <div className="relative w-full h-[40vh] max-w-2xl">
        <Image
          src="/images/initial_questions.svg"
          alt="Teacher"
          fill
          className="object-contain"
        />
      </div>
      <Button
        className="mt-8 px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
        onClick={handleStartQuiz}
      >
        Start the Quiz
      </Button>
    </div>
  );
};

export default InitialView;
