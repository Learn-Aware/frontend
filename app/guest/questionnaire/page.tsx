"use client";

import React, { useEffect, useState } from "react";
import { questions } from "@/data/questions";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  Button,
} from "@/components/ui";
import InitialView from "./components/InitialView";
import LearningStyleRadar from "./components/LearningStyleRadar";
import { useRouter } from "next/navigation";

interface IAnswers {
  a: number;
  b: number;
}

const Profile = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<IAnswers[][]>(
    Array(4)
      .fill(null)
      .map((_, subcategoryIndex) =>
        questions
          .slice(subcategoryIndex * 11, (subcategoryIndex + 1) * 11)
          .map(() => ({ a: 0, b: 0 }))
      )
  );

  const [skippedCategories, setSkippedCategories] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const handleAnswer = (selectedAnswer: "a" | "b") => {
    const updatedAnswers = [...selectedAnswers];
    const answersForCategory = updatedAnswers[currentCategoryIndex];

    if (selectedAnswer === "a") {
      answersForCategory[currentQuestionIndex].a += 1;
    } else {
      answersForCategory[currentQuestionIndex].b += 1;
    }

    const selectedCountA = answersForCategory.reduce(
      (count, answer) => count + answer.a,
      0
    );
    const selectedCountB = answersForCategory.reduce(
      (count, answer) => count + answer.b,
      0
    );

    if (selectedCountA >= 6 || selectedCountB >= 6) {
      const newSkippedCategories = [...skippedCategories];
      newSkippedCategories[currentCategoryIndex] = true;
      setSkippedCategories(newSkippedCategories);

      if (currentCategoryIndex < 3) {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentQuestionIndex(0);
      }
    } else {
      if (
        currentQuestionIndex < 10 &&
        !skippedCategories[currentCategoryIndex]
      ) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }

    setSelectedAnswers(updatedAnswers);
  };

  const getCurrentQuestion = (
    categoryIndex: number,
    currentQuestionIndex: number
  ) => {
    if (skippedCategories[categoryIndex]) return null;
    return questions.slice(categoryIndex * 11, (categoryIndex + 1) * 11)[
      currentQuestionIndex
    ];
  };

  useEffect(() => {
    if (skippedCategories.every((skipped) => skipped)) {
      setIsQuizCompleted(true);
    }
  }, [skippedCategories]);

  const currentQuestion = getCurrentQuestion(
    currentCategoryIndex,
    currentQuestionIndex
  );

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const computeLearningStyleData = () => {
    const pairs = [
      ["Active", "Reflective"],
      ["Sensing", "Intuitive"],
      ["Visual", "Verbal"],
      ["Sequential", "Global"],
    ];

    const allStyles = pairs.map(([styleA, styleB], index) => {
      let valueA = selectedAnswers[index].reduce((sum, ans) => sum + ans.a, 0);
      let valueB = selectedAnswers[index].reduce((sum, ans) => sum + ans.b, 0);

      if (valueA === 0 && valueB > 0) {
        valueA = 11 - valueB;
      } else if (valueB === 0 && valueA > 0) {
        valueB = 11 - valueA;
      } else if (valueA + valueB !== 11) {
        const total = valueA + valueB;
        if (total > 0) {
          valueA = Math.round((valueA / total) * 11);
          valueB = 11 - valueA;
        }
      }

      return [
        { style: styleA, value: valueA },
        { style: styleB, value: valueB },
      ];
    });

    return allStyles.flat();
  };

  return (
    <div>
      <Card className="my-1 mx-0 p-8 bg-white shadow-lg rounded-lg">
        {!isQuizStarted ? (
          <InitialView handleStartQuiz={handleStartQuiz} />
        ) : isQuizCompleted ? (
          <CardContent>
            <Button
              className="bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors"
              onClick={() => router.push("/guest")}
            >
              ← Back to Dashboard
            </Button>
            <CardTitle className="text-2xl font-semibold text-center mb-6">
              Learning Style Classification
            </CardTitle>
            <div className="space-y-6">
              <LearningStyleRadar data={computeLearningStyleData()} />
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-500">
                Step {currentCategoryIndex + 1} of 4
              </CardTitle>
            </CardHeader>
            <p className="my-4 text-gray-800 text-2xl font-medium">
              Question {currentQuestionIndex + 1} of 11
            </p>
            <p className="mb-4 text-gray-500 text-lg">
              {currentQuestion?.text}
            </p>
            <div className="flex flex-col space-y-4">
              <Button
                className="p-8 text-lg font-medium bg-white text-gray-700 border border-[hsl(var(--laai-blue))] rounded-2xl shadow-md transition-all duration-200 hover:bg-gray-100 hover:shadow-lg active:scale-95 flex items-center"
                onClick={() => handleAnswer("a")}
              >
                <span className="whitespace-normal break-words text-left leading-tight">
                  {currentQuestion?.options.a}
                </span>
              </Button>
              <Button
                className="p-8 text-lg font-medium bg-white text-gray-700 border border-[hsl(var(--laai-blue))] rounded-2xl shadow-md transition-all duration-200 hover:bg-gray-100 hover:shadow-lg active:scale-95 flex items-center"
                onClick={() => handleAnswer("b")}
              >
                <span className="whitespace-normal break-words text-left leading-tight">
                  {currentQuestion?.options.b}
                </span>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Profile;
