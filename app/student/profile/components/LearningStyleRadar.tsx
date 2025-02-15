"use client";

import { CardHeader, CardTitle } from "@/src/components/ui";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const defaultData = [
  { style: "Active", value: 6 },
  { style: "Reflective", value: 5 },
  { style: "Sensing", value: 4 },
  { style: "Intuitive", value: 7 },
  { style: "Visual", value: 8 },
  { style: "Verbal", value: 3 },
  { style: "Sequential", value: 4 },
  { style: "Global", value: 7 },
];

const getLearningDescription = (data: { style: string; value: number }[]) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topStyles = sortedData.slice(0, 4).map((d) => d.style);
  return `Your learning styles are: ${topStyles.join(", ")}.`;
};

const LearningStyleRadar = ({ data = defaultData }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-500">
          Learning Style Based on Your Answers
        </CardTitle>
        <CardTitle className="text-lg font-semibold text-gray-500">
          (Active-Reflective, Sensing-Intuitive, Visual-Verbal,
          Sequential-Global)
        </CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="style" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name="Learning Style"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
      <p className="mt-4 text-lg font-medium text-center text-gray-600">
        {getLearningDescription(data)}
      </p>
    </>
  );
};

export default LearningStyleRadar;
