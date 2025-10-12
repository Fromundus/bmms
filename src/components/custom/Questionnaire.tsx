import React from "react";

export interface QuestionnaireData {
  lowIncome: boolean;
  recentIllness: boolean;
  eats3Meals: boolean;
  eatsVegetables: boolean;
  cleanWater: boolean;
  breastfeeding?: boolean; // for infants, optional
}

interface QuestionnaireProps {
  data: QuestionnaireData;
  setData: (data: QuestionnaireData) => void;
}

export default function Questionnaire({ data, setData }: QuestionnaireProps) {
  const handleChange = (key: keyof QuestionnaireData) => {
    setData({ ...data, [key]: !data[key] });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.lowIncome}
            onChange={() => handleChange("lowIncome")}
          />
          <span>Family income below ₱10,000/month</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.recentIllness}
            onChange={() => handleChange("recentIllness")}
          />
          <span>Experienced illness or infection recently</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.eats3Meals}
            onChange={() => handleChange("eats3Meals")}
          />
          <span>Eats at least 3 meals per day</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.eatsVegetables}
            onChange={() => handleChange("eatsVegetables")}
          />
          <span>Eats vegetables or fruits regularly</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.cleanWater}
            onChange={() => handleChange("cleanWater")}
          />
          <span>Has access to clean drinking water</span>
        </label>

        {/* Optional infant-specific question */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.breastfeeding || false}
            onChange={() => handleChange("breastfeeding")}
          />
          <span>Child is being breastfed (if applicable)</span>
        </label>
      </div>
    </div>
  );
}
