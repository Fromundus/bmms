// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronRight, BookOpen, Utensils, Droplets, Apple, Leaf, Heart } from "lucide-react";
// import AdminPageMain from "@/components/custom/AdminPageMain";

// const guidanceTopics = [
//   {
//     id: "dietary-variety",
//     title: "Dietary Variety & Balance",
//     icon: Utensils,
//     content: {
//       overview: "A balanced diet includes foods from all major food groups to ensure proper nutrition and growth.",
//       tips: [
//         "Include rice or other grains as the main energy source",
//         "Add protein sources like fish, chicken, eggs, or beans daily",
//         "Eat colorful vegetables and fruits - aim for 5 servings per day",
//         "Include dairy products or calcium-rich foods for strong bones",
//         "Limit processed foods, sweets, and sugary drinks"
//       ],
//       localFoods: [
//         "Malunggay leaves - rich in vitamins A, C, and iron",
//         "Sweet potato - good source of vitamin A and fiber",
//         "Mung beans - excellent protein and folate source",
//         "Guava - high in vitamin C",
//         "Sardines - provides protein and calcium"
//       ]
//     }
//   },
//   {
//     id: "hydration",
//     title: "Proper Hydration",
//     icon: Droplets,
//     content: {
//       overview: "Adequate water intake is essential for all body functions and helps prevent dehydration-related health issues.",
//       tips: [
//         "Drink at least 8 glasses of clean, safe water daily",
//         "Increase water intake during hot weather or physical activity",
//         "Infants under 6 months should only receive breast milk",
//         "Children need more water relative to their body weight",
//         "Avoid sugary drinks and excessive caffeine"
//       ],
//       signs: [
//         "Dark yellow urine indicates dehydration",
//         "Pale yellow urine shows good hydration",
//         "Dry mouth, fatigue, and headaches may signal dehydration",
//         "Children may become irritable when dehydrated"
//       ]
//     }
//   },
//   {
//     id: "proteins",
//     title: "Protein Requirements",
//     icon: Apple,
//     content: {
//       overview: "Proteins are essential for growth, tissue repair, and immune function, especially important for children.",
//       tips: [
//         "Children need 1-2 grams of protein per kg of body weight daily",
//         "Include protein in every meal",
//         "Combine rice and beans for complete protein",
//         "Fish provides high-quality protein and healthy fats",
//         "Eggs are an excellent, affordable protein source"
//       ],
//       sources: [
//         "Animal proteins: Fish, chicken, eggs, milk",
//         "Plant proteins: Beans, lentils, nuts, seeds",
//         "Combined proteins: Rice with beans or lentils",
//         "Local options: Dried fish, mongo beans, peanuts"
//       ]
//     }
//   },
//   {
//     id: "local-foods",
//     title: "Local Nutritious Foods",
//     icon: Leaf,
//     content: {
//       overview: "Local foods are often more affordable, fresh, and culturally appropriate while providing excellent nutrition.",
//       malunggay: {
//         benefits: "Known as the 'miracle tree', malunggay is extremely nutritious",
//         uses: [
//           "Add fresh leaves to soups and stews",
//           "Make malunggay tea from dried leaves",
//           "Use in omelets and vegetable dishes",
//           "Powder dried leaves as a supplement"
//         ],
//         nutrients: "Rich in vitamins A, C, calcium, iron, and protein"
//       },
//       otherFoods: [
//         {
//           name: "Kangkong (Water Spinach)",
//           benefits: "High in iron, vitamins A and C",
//           preparation: "Sauté with garlic and onions"
//         },
//         {
//           name: "Kamote (Sweet Potato)",
//           benefits: "Rich in vitamin A, fiber, and energy",
//           preparation: "Boil, steam, or roast as snack or meal"
//         },
//         {
//           name: "Sayote (Chayote)",
//           benefits: "Good source of vitamin C and fiber",
//           preparation: "Add to soups or stir-fry dishes"
//         }
//       ]
//     }
//   },
//   {
//     id: "child-feeding",
//     title: "Child Feeding Guidelines",
//     icon: Heart,
//     content: {
//       overview: "Proper feeding practices during infancy and childhood lay the foundation for lifelong health.",
//       ageGroups: [
//         {
//           age: "0-6 months",
//           guidance: "Exclusive breastfeeding - no water, food, or other liquids needed"
//         },
//         {
//           age: "6-12 months", 
//           guidance: "Continue breastfeeding + introduce complementary foods gradually"
//         },
//         {
//           age: "1-2 years",
//           guidance: "Family foods with appropriate texture, continue breastfeeding"
//         },
//         {
//           age: "2+ years",
//           guidance: "Regular family meals with variety, proper portions"
//         }
//       ],
//       feedingTips: [
//         "Start with iron-rich foods like pureed meat or fortified cereals",
//         "Introduce one new food at a time",
//         "Offer foods multiple times - it may take 8-10 exposures",
//         "Let children self-feed when developmentally ready",
//         "Make mealtimes pleasant and social"
//       ]
//     }
//   }
// ];

// const NutritionalGuidancePage = () => {
//   const [openTopics, setOpenTopics] = useState<string[]>([]);

//   const toggleTopic = (topicId: string) => {
//     setOpenTopics(prev => 
//       prev.includes(topicId) 
//         ? prev.filter(id => id !== topicId)
//         : [...prev, topicId]
//     );
//   };

//   return (
//     <AdminPageMain title="Nutritional Guidance" description="Nutrition Education for Barangay Pacogon">
//       <Card className="bmms-card">
//         <CardHeader>
//           <CardTitle className="text-center">Nutrition Education for Barangay Pacogon</CardTitle>
//           <p className="text-center text-muted-foreground">
//             Evidence-based guidance for preventing and addressing malnutrition in our community
//           </p>
//         </CardHeader>
//       </Card>

//       <div className="space-y-4">
//         {guidanceTopics.map((topic) => {
//           const isOpen = openTopics.includes(topic.id);
//           const Icon = topic.icon;
          
//           return (
//             <Card key={topic.id} className="bmms-card">
//               <Collapsible open={isOpen} onOpenChange={() => toggleTopic(topic.id)}>
//                 <CollapsibleTrigger asChild>
//                   <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Icon className="h-6 w-6 text-primary" />
//                         <CardTitle className="text-lg">{topic.title}</CardTitle>
//                       </div>
//                       {isOpen ? (
//                         <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                       ) : (
//                         <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                       )}
//                     </div>
//                   </CardHeader>
//                 </CollapsibleTrigger>
                
//                 <CollapsibleContent>
//                   <CardContent className="pt-0">
//                     <div className="space-y-6">
//                       <p className="text-muted-foreground">{topic.content.overview}</p>
                      
//                       {topic.content.tips && (
//                         <div>
//                           <h4 className="font-semibold mb-3">Key Recommendations:</h4>
//                           <ul className="space-y-2">
//                             {topic.content.tips.map((tip, index) => (
//                               <li key={index} className="flex items-start gap-2">
//                                 <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
//                                 <span className="text-sm">{tip}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {topic.content.localFoods && (
//                         <div>
//                           <h4 className="font-semibold mb-3">Local Nutritious Foods:</h4>
//                           <ul className="space-y-2">
//                             {topic.content.localFoods.map((food, index) => (
//                               <li key={index} className="flex items-start gap-2">
//                                 <Leaf className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
//                                 <span className="text-sm">{food}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {topic.content.sources && (
//                         <div>
//                           <h4 className="font-semibold mb-3">Protein Sources:</h4>
//                           <ul className="space-y-2">
//                             {topic.content.sources.map((source, index) => (
//                               <li key={index} className="flex items-start gap-2">
//                                 <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
//                                 <span className="text-sm">{source}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {topic.content.malunggay && (
//                         <div className="bg-green-50 p-4 rounded-lg">
//                           <h4 className="font-semibold mb-2 text-green-800">Malunggay (Moringa) - The Miracle Tree</h4>
//                           <p className="text-sm text-green-700 mb-3">{topic.content.malunggay.nutrients}</p>
//                           <div className="space-y-2">
//                             <h5 className="font-medium text-green-800">How to Use:</h5>
//                             {topic.content.malunggay.uses.map((use, index) => (
//                               <div key={index} className="flex items-start gap-2">
//                                 <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
//                                 <span className="text-sm text-green-700">{use}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {topic.content.ageGroups && (
//                         <div>
//                           <h4 className="font-semibold mb-3">Feeding by Age Group:</h4>
//                           <div className="space-y-3">
//                             {topic.content.ageGroups.map((group, index) => (
//                               <div key={index} className="bg-blue-50 p-3 rounded-lg">
//                                 <h5 className="font-medium text-blue-800">{group.age}</h5>
//                                 <p className="text-sm text-blue-700">{group.guidance}</p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </CollapsibleContent>
//               </Collapsible>
//             </Card>
//           );
//         })}
//       </div>
//     </AdminPageMain>
//   );
// };

// export default NutritionalGuidancePage;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, BookOpen, Utensils, Droplets, Apple, Leaf, Heart } from "lucide-react";
import AdminPageMain from "@/components/custom/AdminPageMain";

/**
 * Nutritional guidance topics — aligned with WHO 2023 guidelines
 * on the prevention and management of wasting and malnutrition.
 */
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
