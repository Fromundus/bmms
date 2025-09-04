import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, BookOpen, Utensils, Droplets, Apple, Leaf, Heart } from "lucide-react";
import AdminPageMain from "@/components/custom/AdminPageMain";

const guidanceTopics = [
  {
    id: "dietary-variety",
    title: "Dietary Variety & Balance",
    icon: Utensils,
    content: {
      overview: "A balanced diet includes foods from all major food groups to ensure proper nutrition and growth.",
      tips: [
        "Include rice or other grains as the main energy source",
        "Add protein sources like fish, chicken, eggs, or beans daily",
        "Eat colorful vegetables and fruits - aim for 5 servings per day",
        "Include dairy products or calcium-rich foods for strong bones",
        "Limit processed foods, sweets, and sugary drinks"
      ],
      localFoods: [
        "Malunggay leaves - rich in vitamins A, C, and iron",
        "Sweet potato - good source of vitamin A and fiber",
        "Mung beans - excellent protein and folate source",
        "Guava - high in vitamin C",
        "Sardines - provides protein and calcium"
      ]
    }
  },
  {
    id: "hydration",
    title: "Proper Hydration",
    icon: Droplets,
    content: {
      overview: "Adequate water intake is essential for all body functions and helps prevent dehydration-related health issues.",
      tips: [
        "Drink at least 8 glasses of clean, safe water daily",
        "Increase water intake during hot weather or physical activity",
        "Infants under 6 months should only receive breast milk",
        "Children need more water relative to their body weight",
        "Avoid sugary drinks and excessive caffeine"
      ],
      signs: [
        "Dark yellow urine indicates dehydration",
        "Pale yellow urine shows good hydration",
        "Dry mouth, fatigue, and headaches may signal dehydration",
        "Children may become irritable when dehydrated"
      ]
    }
  },
  {
    id: "proteins",
    title: "Protein Requirements",
    icon: Apple,
    content: {
      overview: "Proteins are essential for growth, tissue repair, and immune function, especially important for children.",
      tips: [
        "Children need 1-2 grams of protein per kg of body weight daily",
        "Include protein in every meal",
        "Combine rice and beans for complete protein",
        "Fish provides high-quality protein and healthy fats",
        "Eggs are an excellent, affordable protein source"
      ],
      sources: [
        "Animal proteins: Fish, chicken, eggs, milk",
        "Plant proteins: Beans, lentils, nuts, seeds",
        "Combined proteins: Rice with beans or lentils",
        "Local options: Dried fish, mongo beans, peanuts"
      ]
    }
  },
  {
    id: "local-foods",
    title: "Local Nutritious Foods",
    icon: Leaf,
    content: {
      overview: "Local foods are often more affordable, fresh, and culturally appropriate while providing excellent nutrition.",
      malunggay: {
        benefits: "Known as the 'miracle tree', malunggay is extremely nutritious",
        uses: [
          "Add fresh leaves to soups and stews",
          "Make malunggay tea from dried leaves",
          "Use in omelets and vegetable dishes",
          "Powder dried leaves as a supplement"
        ],
        nutrients: "Rich in vitamins A, C, calcium, iron, and protein"
      },
      otherFoods: [
        {
          name: "Kangkong (Water Spinach)",
          benefits: "High in iron, vitamins A and C",
          preparation: "Sauté with garlic and onions"
        },
        {
          name: "Kamote (Sweet Potato)",
          benefits: "Rich in vitamin A, fiber, and energy",
          preparation: "Boil, steam, or roast as snack or meal"
        },
        {
          name: "Sayote (Chayote)",
          benefits: "Good source of vitamin C and fiber",
          preparation: "Add to soups or stir-fry dishes"
        }
      ]
    }
  },
  {
    id: "child-feeding",
    title: "Child Feeding Guidelines",
    icon: Heart,
    content: {
      overview: "Proper feeding practices during infancy and childhood lay the foundation for lifelong health.",
      ageGroups: [
        {
          age: "0-6 months",
          guidance: "Exclusive breastfeeding - no water, food, or other liquids needed"
        },
        {
          age: "6-12 months", 
          guidance: "Continue breastfeeding + introduce complementary foods gradually"
        },
        {
          age: "1-2 years",
          guidance: "Family foods with appropriate texture, continue breastfeeding"
        },
        {
          age: "2+ years",
          guidance: "Regular family meals with variety, proper portions"
        }
      ],
      feedingTips: [
        "Start with iron-rich foods like pureed meat or fortified cereals",
        "Introduce one new food at a time",
        "Offer foods multiple times - it may take 8-10 exposures",
        "Let children self-feed when developmentally ready",
        "Make mealtimes pleasant and social"
      ]
    }
  }
];

const NutritionalGuidancePage = () => {
  const [openTopics, setOpenTopics] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    setOpenTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <AdminPageMain title="Nutritional Guidance" description="Nutrition Education for Barangay Pacogon">
      <Card className="bmms-card">
        <CardHeader>
          <CardTitle className="text-center">Nutrition Education for Barangay Pacogon</CardTitle>
          <p className="text-center text-muted-foreground">
            Evidence-based guidance for preventing and addressing malnutrition in our community
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
                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      <p className="text-muted-foreground">{topic.content.overview}</p>
                      
                      {topic.content.tips && (
                        <div>
                          <h4 className="font-semibold mb-3">Key Recommendations:</h4>
                          <ul className="space-y-2">
                            {topic.content.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.content.localFoods && (
                        <div>
                          <h4 className="font-semibold mb-3">Local Nutritious Foods:</h4>
                          <ul className="space-y-2">
                            {topic.content.localFoods.map((food, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Leaf className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{food}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.content.sources && (
                        <div>
                          <h4 className="font-semibold mb-3">Protein Sources:</h4>
                          <ul className="space-y-2">
                            {topic.content.sources.map((source, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{source}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.content.malunggay && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-green-800">Malunggay (Moringa) - The Miracle Tree</h4>
                          <p className="text-sm text-green-700 mb-3">{topic.content.malunggay.nutrients}</p>
                          <div className="space-y-2">
                            <h5 className="font-medium text-green-800">How to Use:</h5>
                            {topic.content.malunggay.uses.map((use, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                                <span className="text-sm text-green-700">{use}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {topic.content.ageGroups && (
                        <div>
                          <h4 className="font-semibold mb-3">Feeding by Age Group:</h4>
                          <div className="space-y-3">
                            {topic.content.ageGroups.map((group, index) => (
                              <div key={index} className="bg-blue-50 p-3 rounded-lg">
                                <h5 className="font-medium text-blue-800">{group.age}</h5>
                                <p className="text-sm text-blue-700">{group.guidance}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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