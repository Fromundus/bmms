import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, BookOpen, Utensils, Droplets, Apple, Leaf, Heart } from "lucide-react";
import AdminPageMain from "@/components/custom/AdminPageMain";

const guidanceTopics = [
  {
    id: "prevention-wasting",
    title: "Prevention of Wasting & Malnutrition",
    icon: BookOpen,
    content: {
      overview:
        "According to the World Health Organization (WHO, 2023), preventing wasting (acute malnutrition) and undernutrition in children under 5 is a global health priority. Early detection, breastfeeding support, diverse local diets, and sanitation improvements are key.",
      definitions: [
        {
          term: "Wasting",
          definition:
            "Weight-for-height more than 2 standard deviations below the WHO Child Growth Standards median.",
        },
        {
          term: "Severe Acute Malnutrition (SAM)",
          definition:
            "Weight-for-height < –3 SD, or mid-upper arm circumference (MUAC) <115 mm, or presence of bilateral pitting oedema.",
        },
        {
          term: "Moderate Acute Malnutrition (MAM)",
          definition:
            "Weight-for-height between –2 and –3 SD, or MUAC 115–125 mm.",
        },
      ],
      preventionTips: [
        "Ensure exclusive breastfeeding for the first 6 months of life.",
        "Continue breastfeeding up to 2 years or beyond while introducing complementary foods at 6 months.",
        "Provide safe, diverse, and nutrient-rich local foods.",
        "Promote handwashing, safe drinking water, and sanitation.",
        "Monitor child growth regularly and seek early care for poor weight gain.",
      ],
    },
  },
  {
    id: "dietary-variety",
    title: "Dietary Variety & Balance",
    icon: Utensils,
    content: {
      overview:
        "A balanced diet includes all major food groups, ensuring essential vitamins, minerals, and energy for proper growth and development.",
      tips: [
        "Include grains (rice, corn, root crops) as main energy sources.",
        "Add protein sources like fish, chicken, eggs, or beans daily.",
        "Eat colorful vegetables and fruits — aim for 5 servings daily.",
        "Include calcium-rich foods such as milk or malunggay leaves.",
        "Limit processed foods, salt, and sugary drinks.",
      ],
      localFoods: [
        "Malunggay (Moringa) — rich in vitamins A, C, and iron.",
        "Sweet potato — source of vitamin A and fiber.",
        "Mung beans — protein and folate-rich.",
        "Guava — excellent source of vitamin C.",
        "Sardines — high in protein and calcium.",
      ],
    },
  },
  {
    id: "hydration",
    title: "Proper Hydration",
    icon: Droplets,
    content: {
      overview:
        "Adequate water intake supports digestion, nutrient transport, and temperature regulation. Dehydration is especially dangerous in children.",
      tips: [
        "Drink 8 or more glasses of safe, clean water daily.",
        "Increase fluid intake in hot weather or physical activity.",
        "Infants under 6 months should receive only breast milk.",
        "Avoid sugary drinks and excessive caffeine.",
      ],
      signs: [
        "Dark yellow urine indicates dehydration.",
        "Pale yellow urine shows good hydration.",
        "Dry mouth and fatigue may signal dehydration.",
      ],
    },
  },
  {
    id: "proteins",
    title: "Protein Requirements",
    icon: Apple,
    content: {
      overview:
        "Proteins are essential for tissue repair, immune function, and muscle development, particularly important for children and pregnant women.",
      tips: [
        "Children need around 1–2 g of protein per kg body weight daily.",
        "Include a protein source in every meal.",
        "Combine plant and animal proteins for completeness.",
        "Fish and eggs provide high-quality, affordable protein.",
      ],
      sources: [
        "Animal proteins: Fish, chicken, eggs, milk.",
        "Plant proteins: Beans, lentils, nuts, and seeds.",
        "Local combined proteins: Rice with mung beans or lentils.",
      ],
    },
  },
  {
    id: "local-foods",
    title: "Local Nutritious Foods",
    icon: Leaf,
    content: {
      overview:
        "Locally available foods are often fresh, affordable, and nutrient-dense. WHO encourages communities to promote the use of these to prevent malnutrition.",
      malunggay: {
        benefits: "Known as the 'miracle tree', malunggay is nutrient-rich and widely available.",
        uses: [
          "Add leaves to soups and stews.",
          "Dry and powder leaves to mix into porridge.",
          "Use in omelets or vegetable dishes.",
        ],
        nutrients:
          "Rich in vitamins A and C, calcium, iron, and protein — supports immunity and growth.",
      },
      otherFoods: [
        {
          name: "Kangkong (Water Spinach)",
          benefits: "High in iron, vitamins A and C.",
          preparation: "Sauté with garlic and onions.",
        },
        {
          name: "Kamote (Sweet Potato)",
          benefits: "High in vitamin A, fiber, and energy.",
          preparation: "Boil, steam, or roast as a snack or meal.",
        },
        {
          name: "Sayote (Chayote)",
          benefits: "Good source of vitamin C and fiber.",
          preparation: "Add to soups or stir-fry dishes.",
        },
      ],
    },
  },
  {
    id: "child-feeding",
    title: "Infant & Young Child Feeding (IYCF)",
    icon: Heart,
    content: {
      overview:
        "Proper feeding in the first 1,000 days (from conception to age 2) lays the foundation for lifelong health and aligns with WHO’s IYCF recommendations.",
      ageGroups: [
        {
          age: "0–6 months",
          guidance:
            "Exclusive breastfeeding — no water, other liquids, or food needed.",
        },
        {
          age: "6–12 months",
          guidance:
            "Continue breastfeeding and introduce complementary foods gradually.",
        },
        {
          age: "1–2 years",
          guidance:
            "Family foods with suitable texture, continue breastfeeding.",
        },
        {
          age: "2+ years",
          guidance:
            "Regular family meals with variety and age-appropriate portions.",
        },
      ],
      feedingTips: [
        "Introduce one new food at a time and watch for allergies.",
        "Offer iron-rich foods like fortified cereals, eggs, or meat.",
        "Encourage responsive feeding — let children self-feed when ready.",
        "Keep mealtimes pleasant and avoid forcing children to eat.",
      ],
    },
  },
];

const NutritionalGuidancePage = () => {
  const [openTopics, setOpenTopics] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setOpenTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <AdminPageMain
      title="Nutritional Guidance"
      description="Aligned with World Health Organization (WHO) 2023 Guidelines on Child Nutrition and Malnutrition"
    >
      <Card className="bmms-card">
        <CardHeader>
          <CardTitle className="text-center">
            Nutrition Education for Barangay Pacogon
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Evidence-based guidance based on WHO recommendations for preventing
            and managing malnutrition in children and families.
          </p>
        </CardHeader>
      </Card>

      <NutritionLegend />

      <div className="space-y-4">
        {guidanceTopics.map((topic) => {
          const isOpen = openTopics.includes(topic.id);
          const Icon = topic.icon;

          return (
            <Card key={topic.id} className="bmms-card">
              <Collapsible open={isOpen} onOpenChange={() => toggleTopic(topic.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-6">
                    <p className="text-muted-foreground">{topic.content.overview}</p>

                    {topic.content.definitions && (
                      <div>
                        <h4 className="font-semibold mb-3">Key Definitions:</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.definitions.map((d, idx) => (
                            <li key={idx}>
                              <strong>{d.term}:</strong> {d.definition}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.content.preventionTips && (
                      <div>
                        <h4 className="font-semibold mb-3">Prevention Tips:</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.preventionTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.content.tips && (
                      <div>
                        <h4 className="font-semibold mb-3">Key Recommendations:</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.content.localFoods && (
                      <div>
                        <h4 className="font-semibold mb-3">Local Nutritious Foods:</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.localFoods.map((food, idx) => (
                            <li key={idx}>{food}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.content.sources && (
                      <div>
                        <h4 className="font-semibold mb-3">Protein Sources:</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.sources.map((source, idx) => (
                            <li key={idx}>{source}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.content.malunggay && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          Malunggay (Moringa) — The Miracle Tree
                        </h4>
                        <p className="text-sm text-green-700 mb-3">
                          {topic.content.malunggay.nutrients}
                        </p>
                        <h5 className="font-medium text-green-800 mb-1">
                          How to Use:
                        </h5>
                        <ul className="space-y-1 list-disc list-inside text-green-700 text-sm">
                          {topic.content.malunggay.uses.map((use, idx) => (
                            <li key={idx}>{use}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {topic.content.ageGroups && (
                      <div>
                        <h4 className="font-semibold mb-3">Feeding by Age Group:</h4>
                        <div className="space-y-3">
                          {topic.content.ageGroups.map((group, idx) => (
                            <div
                              key={idx}
                              className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                            >
                              <h5 className="font-medium text-blue-800">
                                {group.age}
                              </h5>
                              <p className="text-sm text-blue-700">
                                {group.guidance}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </AdminPageMain>
  );
};

export default NutritionalGuidancePage;

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldCheck, Activity, HeartPulse } from "lucide-react";

const NutritionLegend = () => {
  return (
    <Card className="bmms-card border border-muted">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <HeartPulse className="h-5 w-5 text-primary" />
          Nutrition Status Legend
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          Understanding what the colors and labels mean in child and adult nutrition screening
        </p>
      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-4">
        {/* Severe */}
        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <Badge className="bg-red-500">Severe</Badge>
          </div>
          <p className="text-sm text-red-800">
            The person has **very serious malnutrition or obesity** that can threaten health or life.
            This includes:
          </p>
          <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
            <li>Severely Underweight</li>
            <li>Severely Stunted</li>
            <li>Severely Wasted</li>
            <li>Extreme Obesity or BMI ≥ 30</li>
          </ul>
          <p className="text-xs text-red-700 mt-2">
            ⚠ Needs **urgent medical or nutrition intervention**.
          </p>
        </div>

        {/* Moderate */}
        <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-orange-600" />
            <Badge className="bg-orange-500">Moderate</Badge>
          </div>
          <p className="text-sm text-orange-800">
            The person has **clear nutritional problems** that can worsen if not addressed.
          </p>
          <ul className="list-disc list-inside text-sm text-orange-700 mt-2 space-y-1">
            <li>Underweight</li>
            <li>Stunted growth</li>
            <li>Wasted or Obese</li>
          </ul>
          <p className="text-xs text-orange-700 mt-2">
            ⚠ Needs **nutrition support and monitoring**.
          </p>
        </div>

        {/* At Risk */}
        <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-yellow-600" />
            <Badge className="bg-yellow-500">At Risk</Badge>
          </div>
          <p className="text-sm text-yellow-800">
            The person is **not yet malnourished**, but signs show they may become unhealthy.
          </p>
          <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
            <li>Mildly underweight</li>
            <li>Overweight</li>
            <li>BMI between 18.5 and 20 (thin)</li>
          </ul>
          <p className="text-xs text-yellow-700 mt-2">
            ⚠ Needs **diet improvement and regular follow-up**.
          </p>
        </div>

        {/* Healthy */}
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse className="h-5 w-5 text-green-600" />
            <Badge className="bg-green-500">Healthy</Badge>
          </div>
          <p className="text-sm text-green-800">
            The person has **normal weight, height, and BMI for their age**.
          </p>
          <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
            <li>Normal weight-for-age</li>
            <li>Normal height-for-age</li>
            <li>Normal BMI</li>
          </ul>
          <p className="text-xs text-green-700 mt-2">
            ✅ Continue **good feeding and healthy lifestyle**.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
