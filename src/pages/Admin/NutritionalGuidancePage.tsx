// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { ChevronDown, ChevronRight, BookOpen, Utensils, Droplets, Apple, Leaf, Heart, Info, Search, AlertCircle } from "lucide-react";
// import AdminPageMain from "@/components/custom/AdminPageMain";

// const guidanceTopics = [
//   {
//     id: "prevention-wasting",
//     title: "Prevention of Wasting & Malnutrition",
//     icon: BookOpen,
//     content: {
//       overview:
//         "According to the World Health Organization (WHO, 2023), preventing wasting (acute malnutrition) and undernutrition in children under 5 is a global health priority. Early detection, breastfeeding support, diverse local diets, and sanitation improvements are key.",
//       definitions: [
//         {
//           term: "Wasting",
//           definition:
//             "Weight-for-height more than 2 standard deviations below the WHO Child Growth Standards median.",
//         },
//         {
//           term: "Severe Acute Malnutrition (SAM)",
//           definition:
//             "Weight-for-height < –3 SD, or mid-upper arm circumference (MUAC) <115 mm, or presence of bilateral pitting oedema.",
//         },
//         {
//           term: "Moderate Acute Malnutrition (MAM)",
//           definition:
//             "Weight-for-height between –2 and –3 SD, or MUAC 115–125 mm.",
//         },
//       ],
//       preventionTips: [
//         "Ensure exclusive breastfeeding for the first 6 months of life.",
//         "Continue breastfeeding up to 2 years or beyond while introducing complementary foods at 6 months.",
//         "Provide safe, diverse, and nutrient-rich local foods.",
//         "Promote handwashing, safe drinking water, and sanitation.",
//         "Monitor child growth regularly and seek early care for poor weight gain.",
//       ],
//     },
//   },
//   {
//     id: "dietary-variety",
//     title: "Dietary Variety & Balance",
//     icon: Utensils,
//     content: {
//       overview:
//         "A balanced diet includes all major food groups, ensuring essential vitamins, minerals, and energy for proper growth and development.",
//       tips: [
//         "Include grains (rice, corn, root crops) as main energy sources.",
//         "Add protein sources like fish, chicken, eggs, or beans daily.",
//         "Eat colorful vegetables and fruits — aim for 5 servings daily.",
//         "Include calcium-rich foods such as milk or malunggay leaves.",
//         "Limit processed foods, salt, and sugary drinks.",
//       ],
//       localFoods: [
//         "Malunggay (Moringa) — rich in vitamins A, C, and iron.",
//         "Sweet potato — source of vitamin A and fiber.",
//         "Mung beans — protein and folate-rich.",
//         "Guava — excellent source of vitamin C.",
//         "Sardines — high in protein and calcium.",
//       ],
//     },
//   },
//   {
//     id: "hydration",
//     title: "Proper Hydration",
//     icon: Droplets,
//     content: {
//       overview:
//         "Adequate water intake supports digestion, nutrient transport, and temperature regulation. Dehydration is especially dangerous in children.",
//       tips: [
//         "Drink 8 or more glasses of safe, clean water daily.",
//         "Increase fluid intake in hot weather or physical activity.",
//         "Infants under 6 months should receive only breast milk.",
//         "Avoid sugary drinks and excessive caffeine.",
//       ],
//       signs: [
//         "Dark yellow urine indicates dehydration.",
//         "Pale yellow urine shows good hydration.",
//         "Dry mouth and fatigue may signal dehydration.",
//       ],
//     },
//   },
//   {
//     id: "proteins",
//     title: "Protein Requirements",
//     icon: Apple,
//     content: {
//       overview:
//         "Proteins are essential for tissue repair, immune function, and muscle development, particularly important for children and pregnant women.",
//       tips: [
//         "Children need around 1–2 g of protein per kg body weight daily.",
//         "Include a protein source in every meal.",
//         "Combine plant and animal proteins for completeness.",
//         "Fish and eggs provide high-quality, affordable protein.",
//       ],
//       sources: [
//         "Animal proteins: Fish, chicken, eggs, milk.",
//         "Plant proteins: Beans, lentils, nuts, and seeds.",
//         "Local combined proteins: Rice with mung beans or lentils.",
//       ],
//     },
//   },
//   {
//     id: "local-foods",
//     title: "Local Nutritious Foods",
//     icon: Leaf,
//     content: {
//       overview:
//         "Locally available foods are often fresh, affordable, and nutrient-dense. WHO encourages communities to promote the use of these to prevent malnutrition.",
//       malunggay: {
//         benefits: "Known as the 'miracle tree', malunggay is nutrient-rich and widely available.",
//         uses: [
//           "Add leaves to soups and stews.",
//           "Dry and powder leaves to mix into porridge.",
//           "Use in omelets or vegetable dishes.",
//         ],
//         nutrients:
//           "Rich in vitamins A and C, calcium, iron, and protein — supports immunity and growth.",
//       },
//       otherFoods: [
//         {
//           name: "Kangkong (Water Spinach)",
//           benefits: "High in iron, vitamins A and C.",
//           preparation: "Sauté with garlic and onions.",
//         },
//         {
//           name: "Kamote (Sweet Potato)",
//           benefits: "High in vitamin A, fiber, and energy.",
//           preparation: "Boil, steam, or roast as a snack or meal.",
//         },
//         {
//           name: "Sayote (Chayote)",
//           benefits: "Good source of vitamin C and fiber.",
//           preparation: "Add to soups or stir-fry dishes.",
//         },
//       ],
//     },
//   },
//   {
//     id: "child-feeding",
//     title: "Infant & Young Child Feeding (IYCF)",
//     icon: Heart,
//     content: {
//       overview:
//         "Proper feeding in the first 1,000 days (from conception to age 2) lays the foundation for lifelong health and aligns with WHO’s IYCF recommendations.",
//       ageGroups: [
//         {
//           age: "0–6 months",
//           guidance:
//             "Exclusive breastfeeding — no water, other liquids, or food needed.",
//         },
//         {
//           age: "6–12 months",
//           guidance:
//             "Continue breastfeeding and introduce complementary foods gradually.",
//         },
//         {
//           age: "1–2 years",
//           guidance:
//             "Family foods with suitable texture, continue breastfeeding.",
//         },
//         {
//           age: "2+ years",
//           guidance:
//             "Regular family meals with variety and age-appropriate portions.",
//         },
//       ],
//       feedingTips: [
//         "Introduce one new food at a time and watch for allergies.",
//         "Offer iron-rich foods like fortified cereals, eggs, or meat.",
//         "Encourage responsive feeding — let children self-feed when ready.",
//         "Keep mealtimes pleasant and avoid forcing children to eat.",
//       ],
//     },
//   },
// ];

// const NutritionalGuidancePage = () => {
//   const [openTopics, setOpenTopics] = useState<string[]>([]);

//   const toggleTopic = (id: string) => {
//     setOpenTopics((prev) =>
//       prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
//     );
//   };

//   return (
//     <AdminPageMain
//       title="Nutritional Guidance"
//       description="Aligned with World Health Organization (WHO) 2023 Guidelines on Child Nutrition and Malnutrition"
//     >
//       <Card className="bmms-card">
//         <CardHeader>
//           <CardTitle className="text-center">
//             Nutrition Education for Barangay Pacogon
//           </CardTitle>
//           <p className="text-center text-muted-foreground">
//             Evidence-based guidance based on WHO recommendations for preventing
//             and managing malnutrition in children and families.
//           </p>
//         </CardHeader>
//       </Card>

//       <NutritionComputationGuide />
//       <MalnutritionCauseGuide />
//       <NutritionLegend />

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
//                   <CardContent className="pt-0 space-y-6">
//                     <p className="text-muted-foreground">{topic.content.overview}</p>

//                     {topic.content.definitions && (
//                       <div>
//                         <h4 className="font-semibold mb-3">Key Definitions:</h4>
//                         <ul className="space-y-2 list-disc list-inside">
//                           {topic.content.definitions.map((d, idx) => (
//                             <li key={idx}>
//                               <strong>{d.term}:</strong> {d.definition}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {topic.content.preventionTips && (
//                       <div>
//                         <h4 className="font-semibold mb-3">Prevention Tips:</h4>
//                         <ul className="space-y-2 list-disc list-inside">
//                           {topic.content.preventionTips.map((tip, idx) => (
//                             <li key={idx}>{tip}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {topic.content.tips && (
//                       <div>
//                         <h4 className="font-semibold mb-3">Key Recommendations:</h4>
//                         <ul className="space-y-2 list-disc list-inside">
//                           {topic.content.tips.map((tip, idx) => (
//                             <li key={idx}>{tip}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {topic.content.localFoods && (
//                       <div>
//                         <h4 className="font-semibold mb-3">Local Nutritious Foods:</h4>
//                         <ul className="space-y-2 list-disc list-inside">
//                           {topic.content.localFoods.map((food, idx) => (
//                             <li key={idx}>{food}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {topic.content.sources && (
//                       <div>
//                         <h4 className="font-semibold mb-3">Protein Sources:</h4>
//                         <ul className="space-y-2 list-disc list-inside">
//                           {topic.content.sources.map((source, idx) => (
//                             <li key={idx}>{source}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {topic.content.malunggay && (
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <h4 className="font-semibold text-green-800 mb-2">
//                           Malunggay (Moringa) — The Miracle Tree
//                         </h4>
//                         <p className="text-sm text-green-700 mb-3">
//                           {topic.content.malunggay.nutrients}
//                         </p>
//                         <h5 className="font-medium text-green-800 mb-1">
//                           How to Use:
//                         </h5>
//                         <ul className="space-y-1 list-disc list-inside text-green-700 text-sm">
//                           {topic.content.malunggay.uses.map((use, idx) => (
//                             <li key={idx}>{use}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {topic.content.ageGroups && (
//                       <div>
//                         <h4 className="font-semibold mb-3">Feeding by Age Group:</h4>
//                         <div className="space-y-3">
//                           {topic.content.ageGroups.map((group, idx) => (
//                             <div
//                               key={idx}
//                               className="bg-blue-50 p-3 rounded-lg border border-blue-100"
//                             >
//                               <h5 className="font-medium text-blue-800">
//                                 {group.age}
//                               </h5>
//                               <p className="text-sm text-blue-700">
//                                 {group.guidance}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
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

// import { Badge } from "@/components/ui/badge";
// import { AlertTriangle, ShieldCheck, Activity, HeartPulse } from "lucide-react";

// const NutritionLegend = () => {
//   return (
//     <Card className="bmms-card border border-muted">
//       <CardHeader>
//         <CardTitle className="text-center flex items-center justify-center gap-2">
//           <HeartPulse className="h-5 w-5 text-primary" />
//           Nutrition Status Legend
//         </CardTitle>
//         <p className="text-center text-muted-foreground text-sm">
//           Understanding what the colors and labels mean in child and adult nutrition screening
//         </p>
//       </CardHeader>

//       <CardContent className="grid md:grid-cols-2 gap-4">
//         {/* Severe */}
//         <div className="p-4 rounded-lg border border-red-200 bg-red-50">
//           <div className="flex items-center gap-2 mb-2">
//             <AlertTriangle className="h-5 w-5 text-red-600" />
//             <Badge className="bg-red-500">Severe</Badge>
//           </div>
//           <p className="text-sm text-red-800">
//             The person has **very serious malnutrition or obesity** that can threaten health or life.
//             This includes:
//           </p>
//           <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
//             <li>Severely Underweight</li>
//             <li>Severely Stunted</li>
//             <li>Severely Wasted</li>
//             <li>Extreme Obesity or BMI ≥ 30</li>
//           </ul>
//           <p className="text-xs text-red-700 mt-2">
//             ⚠ Needs **urgent medical or nutrition intervention**.
//           </p>
//         </div>

//         {/* Moderate */}
//         <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
//           <div className="flex items-center gap-2 mb-2">
//             <Activity className="h-5 w-5 text-orange-600" />
//             <Badge className="bg-orange-500">Moderate</Badge>
//           </div>
//           <p className="text-sm text-orange-800">
//             The person has **clear nutritional problems** that can worsen if not addressed.
//           </p>
//           <ul className="list-disc list-inside text-sm text-orange-700 mt-2 space-y-1">
//             <li>Underweight</li>
//             <li>Stunted growth</li>
//             <li>Wasted or Obese</li>
//           </ul>
//           <p className="text-xs text-orange-700 mt-2">
//             ⚠ Needs **nutrition support and monitoring**.
//           </p>
//         </div>

//         {/* At Risk */}
//         <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
//           <div className="flex items-center gap-2 mb-2">
//             <ShieldCheck className="h-5 w-5 text-yellow-600" />
//             <Badge className="bg-yellow-500">At Risk</Badge>
//           </div>
//           <p className="text-sm text-yellow-800">
//             The person is **not yet malnourished**, but signs show they may become unhealthy.
//           </p>
//           <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
//             <li>Mildly underweight</li>
//             <li>Overweight</li>
//             <li>BMI between 18.5 and 20 (thin)</li>
//           </ul>
//           <p className="text-xs text-yellow-700 mt-2">
//             ⚠ Needs **diet improvement and regular follow-up**.
//           </p>
//         </div>

//         {/* Healthy */}
//         <div className="p-4 rounded-lg border border-green-200 bg-green-50">
//           <div className="flex items-center gap-2 mb-2">
//             <HeartPulse className="h-5 w-5 text-green-600" />
//             <Badge className="bg-green-500">Healthy</Badge>
//           </div>
//           <p className="text-sm text-green-800">
//             The person has **normal weight, height, and BMI for their age**.
//           </p>
//           <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
//             <li>Normal weight-for-age</li>
//             <li>Normal height-for-age</li>
//             <li>Normal BMI</li>
//           </ul>
//           <p className="text-xs text-green-700 mt-2">
//             ✅ Continue **good feeding and healthy lifestyle**.
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };


// const NutritionComputationGuide = () => {
//   return (
//     <Card className="bmms-card border border-muted">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 justify-center">
//           <Info className="h-5 w-5 text-primary" />
//           How Nutrition Status Is Computed
//         </CardTitle>
//         <p className="text-center text-muted-foreground text-sm">
//           This system uses age, weight, height, and BMI to classify nutrition status
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-6 text-sm text-muted-foreground">
//         {/* WFA */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             1. Weight-for-Age (WFA)
//           </h4>
//           <p>
//             Weight-for-age checks whether a person’s body weight is appropriate
//             for their age group.
//           </p>
//           <ul className="list-disc list-inside mt-2 space-y-1">
//             <li>
//               Younger children are classified as <strong>Severely Underweight</strong> or{" "}
//               <strong>Underweight</strong> if their weight is far below what is expected
//               for their age.
//             </li>
//             <li>
//               Older children and adolescents are checked for underweight status
//               using higher weight thresholds.
//             </li>
//             <li>
//               Adults are screened only for very low weight (underweight) or very
//               high weight (overweight).
//             </li>
//           </ul>
//         </div>

//         {/* HFA */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             2. Height-for-Age (HFA)
//           </h4>
//           <p>
//             Height-for-age measures long-term growth. Low height for age suggests
//             delayed or restricted growth.
//           </p>
//           <ul className="list-disc list-inside mt-2 space-y-1">
//             <li>
//               Children with very short height for their age are classified as{" "}
//               <strong>Severely Stunted</strong>.
//             </li>
//             <li>
//               Children and adolescents below expected height are classified as{" "}
//               <strong>Stunted</strong>.
//             </li>
//             <li>
//               Adults are screened only to identify historically very short stature.
//             </li>
//           </ul>
//         </div>

//         {/* WFH / BMI */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             3. Weight-for-Height / Body Mass Index (BMI)
//           </h4>
//           <p>
//             This indicator checks whether body weight is too low or too high for
//             a person’s height.
//           </p>

//           <div className="mt-2 space-y-2">
//             <p className="font-medium text-foreground">
//               Children & Adolescents (below 20 years)
//             </p>
//             <ul className="list-disc list-inside space-y-1">
//               <li>BMI &lt; 14 → <strong>Severely Wasted</strong></li>
//               <li>BMI &lt; 16 → <strong>Wasted</strong></li>
//               <li>BMI &gt; 23 → <strong>Overweight</strong></li>
//               <li>BMI &gt; 27 → <strong>Obese</strong></li>
//               <li>Otherwise → <strong>Normal</strong></li>
//             </ul>

//             <p className="font-medium text-foreground mt-3">
//               Adults (20 years and above)
//             </p>
//             <ul className="list-disc list-inside space-y-1">
//               <li>BMI &lt; 16 → <strong>Severely Wasted</strong></li>
//               <li>BMI &lt; 18.5 → <strong>Wasted</strong></li>
//               <li>BMI ≥ 25 → <strong>Overweight</strong></li>
//               <li>BMI ≥ 30 → <strong>Obese</strong></li>
//               <li>Otherwise → <strong>Normal</strong></li>
//             </ul>
//           </div>
//         </div>

//         {/* Overall Status */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             4. Overall Nutrition Status
//           </h4>
//           <p>
//             The overall status summarizes all measurements into a single result.
//             The most serious finding always takes priority.
//           </p>

//           <ul className="list-disc list-inside mt-2 space-y-1">
//             <li>
//               <strong>Severe</strong> — Any severe condition (very low BMI, severe
//               underweight, severe stunting, or severe wasting).
//             </li>
//             <li>
//               <strong>Moderate</strong> — Clear nutrition problems such as
//               underweight, stunting, wasting, or obesity.
//             </li>
//             <li>
//               <strong>At Risk</strong> — Mild underweight, overweight, or low-normal BMI.
//             </li>
//             <li>
//               <strong>Healthy</strong> — All measurements fall within normal range.
//             </li>
//           </ul>
//         </div>

//         <div className="text-xs text-muted-foreground pt-2 border-t">
//           ⚠ This nutrition assessment is a screening tool and does not replace
//           professional medical evaluation.
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const MalnutritionCauseGuide = () => {
//   return (
//     <Card className="bmms-card border border-muted">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 justify-center">
//           <Search className="h-5 w-5 text-primary" />
//           How Possible Causes Are Identified
//         </CardTitle>
//         <p className="text-center text-muted-foreground text-sm">
//           Causes are inferred from questionnaire answers and nutrition status
//         </p>
//       </CardHeader>

//       <CardContent className="space-y-6 text-sm text-muted-foreground">
//         <div>
//           <p>
//             The system analyzes possible causes of malnutrition only when a person
//             is <strong>not classified as Healthy</strong>. It uses answers from the
//             household and nutrition questionnaire to identify contributing factors.
//           </p>
//         </div>

//         {/* Undernutrition */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             1. Undernutrition (Severe or Moderate)
//           </h4>
//           <p>
//             When the overall status is <strong>Severe</strong> or{" "}
//             <strong>Moderate</strong>, the system checks for common causes of
//             undernutrition.
//           </p>

//           <ul className="list-disc list-inside mt-2 space-y-1">
//             <li>
//               <strong>Low household income / food insecurity</strong> — if the
//               household reports low income.
//             </li>
//             <li>
//               <strong>Inadequate food intake or skipped meals</strong> — if fewer
//               than three meals are eaten per day.
//             </li>
//             <li>
//               <strong>Poor diet quality</strong> — if vegetables or fruits are not
//               eaten regularly.
//             </li>
//             <li>
//               <strong>Frequent illness or infection</strong> — if there was recent
//               sickness.
//             </li>
//             <li>
//               <strong>Unsafe water or poor sanitation</strong> — if clean drinking
//               water is unavailable.
//             </li>
//             <li>
//               <strong>Lack of breastfeeding</strong> — if an infant is not breastfed.
//             </li>
//           </ul>
//         </div>

//         {/* Overweight */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             2. Overweight or Obesity Risk
//           </h4>
//           <p>
//             When the overall status is <strong>At Risk</strong> or{" "}
//             <strong>Severe</strong>, the system also checks for possible causes of
//             excess weight.
//           </p>

//           <ul className="list-disc list-inside mt-2 space-y-1">
//             <li>
//               <strong>High calorie intake with poor diet balance</strong> — eating
//               regular meals but lacking vegetables.
//             </li>
//             <li>
//               <strong>Sedentary lifestyle or overeating</strong> — when there is no
//               illness and no food insecurity reported.
//             </li>
//           </ul>
//         </div>

//         {/* Fallback */}
//         <div>
//           <h4 className="font-semibold text-foreground mb-2">
//             3. No Identified Cause
//           </h4>
//           <p>
//             If none of the questionnaire answers indicate a clear contributing
//             factor, the system reports:
//           </p>
//           <div className="flex items-center gap-2 mt-2 text-muted-foreground">
//             <AlertCircle className="h-4 w-4" />
//             <span>
//               <em>No significant cause detected based on questionnaire</em>
//             </span>
//           </div>
//         </div>

//         <div className="text-xs text-muted-foreground pt-2 border-t">
//           ⚠ Identified causes are meant to guide
//           nutrition counseling, not to assign blame or make medical diagnoses.
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Utensils,
  Droplets,
  Apple,
  Leaf,
  Heart,
  Info,
  Search,
  AlertCircle,
  AlertTriangle,
  ShieldCheck,
  Activity,
  HeartPulse,
} from "lucide-react";
import AdminPageMain from "@/components/custom/AdminPageMain";

/* -------------------------------------------------------------------------- */
/* NUTRITION STATUS LEGEND                                                    */
/* -------------------------------------------------------------------------- */

const NutritionLegend = () => {
  return (
    <Card className="bmms-card border border-muted">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <HeartPulse className="h-5 w-5 text-primary" />
          Nutrition Status Legend
        </CardTitle>

        <p className="text-center text-muted-foreground text-sm">
          Understanding the nutrition classifications returned by the WHO-based
          computation system
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
            Indicates a severe deviation from the applicable WHO growth
            reference or a severe adult BMI classification.
          </p>

          <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
            <li>Severe Underweight</li>
            <li>Severe Stunting</li>
            <li>Severe Wasting</li>
            <li>Severe Thinness</li>
            <li>Obesity</li>
          </ul>

          <p className="text-xs text-red-700 mt-2">
            ⚠ Results should receive appropriate professional assessment and
            follow-up.
          </p>
        </div>

        {/* Nutrition concern */}
        <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-orange-600" />
            <Badge className="bg-orange-500">Nutrition Concern</Badge>
          </div>

          <p className="text-sm text-orange-800">
            Indicates a nutritional classification outside the normal range.
          </p>

          <ul className="list-disc list-inside text-sm text-orange-700 mt-2 space-y-1">
            <li>Underweight</li>
            <li>Stunting</li>
            <li>Wasting</li>
            <li>Thinness</li>
            <li>Overweight</li>
          </ul>

          <p className="text-xs text-orange-700 mt-2">
            ⚠ Nutrition support, monitoring, and appropriate follow-up may be
            needed.
          </p>
        </div>

        {/* Normal */}
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <HeartPulse className="h-5 w-5 text-green-600" />
            <Badge className="bg-green-500">Normal</Badge>
          </div>

          <p className="text-sm text-green-800">
            The available measurement falls within the normal classification
            range for the applicable indicator.
          </p>

          <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
            <li>Normal weight-for-age</li>
            <li>Normal height-for-age</li>
            <li>Normal weight-for-length/height</li>
            <li>Normal BMI-for-age or adult BMI classification</li>
          </ul>

          <p className="text-xs text-green-700 mt-2">
            ✅ Continue healthy feeding and lifestyle practices.
          </p>
        </div>

        {/* Important note */}
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <Badge className="bg-blue-500">Important</Badge>
          </div>

          <p className="text-sm text-blue-800">
            Different indicators are used depending on the person's age. A
            nutrition result should always be interpreted using the appropriate
            WHO reference for that age group.
          </p>

          <p className="text-xs text-blue-700 mt-2">
            The system's overall status is an application-level summary and is
            not a separate WHO anthropometric indicator.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* WHO NUTRITION COMPUTATION GUIDE                                            */
/* -------------------------------------------------------------------------- */

const NutritionComputationGuide = () => {
  return (
    <Card className="bmms-card border border-muted">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Info className="h-5 w-5 text-primary" />
          How Nutrition Status Is Computed
        </CardTitle>

        <p className="text-center text-muted-foreground text-sm">
          This system uses WHO growth references, age, sex, weight, height, BMI,
          and WHO Z-scores to classify nutrition status.
        </p>
      </CardHeader>

      <CardContent className="space-y-8 text-sm text-muted-foreground">
        {/* 0–5 YEARS */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">
            1. Children 0–5 Years
          </h4>

          <p>
            For children under 5 years, the system uses the{" "}
            <strong>WHO Child Growth Standards</strong>. Measurements are
            compared with WHO reference data and converted into Z-scores.
          </p>

          <div className="mt-4 space-y-5">
            {/* WFA */}
            <div>
              <h5 className="font-medium text-foreground">
                Weight-for-Age (WFA)
              </h5>

              <p className="mt-1">
                Compares the child's weight with the expected weight for their
                age and sex.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 →{" "}
                  <strong>Severe Underweight</strong>
                </li>
                <li>
                  Z-score below −2 → <strong>Underweight</strong>
                </li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>

            {/* HFA */}
            <div>
              <h5 className="font-medium text-foreground">
                Height-for-Age (HFA)
              </h5>

              <p className="mt-1">
                Compares the child's length or height with the expected value
                for their age and sex.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 → <strong>Severe Stunting</strong>
                </li>
                <li>Z-score below −2 → <strong>Stunting</strong></li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>

            {/* WFL/WFH */}
            <div>
              <h5 className="font-medium text-foreground">
                Weight-for-Length / Weight-for-Height (WFL/WFH)
              </h5>

              <p className="mt-1">
                Compares the child's weight with the expected weight for their
                length or height.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 → <strong>Severe Wasting</strong>
                </li>
                <li>Z-score below −2 → <strong>Wasting</strong></li>
                <li>Z-score above +3 → <strong>Obesity</strong></li>
                <li>Z-score above +2 → <strong>Overweight</strong></li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>

            {/* BFA */}
            <div>
              <h5 className="font-medium text-foreground">
                BMI-for-Age (BFA)
              </h5>

              <p className="mt-1">
                BMI is calculated from weight and the appropriate
                anthropometric length or height, then compared with the WHO
                BMI-for-age reference.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 → <strong>Severe Wasting</strong>
                </li>
                <li>Z-score below −2 → <strong>Wasting</strong></li>
                <li>Z-score above +3 → <strong>Obesity</strong></li>
                <li>Z-score above +2 → <strong>Overweight</strong></li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5–19 YEARS */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-foreground mb-2">
            2. Children and Adolescents 5–19 Years
          </h4>

          <p>
            For this age group, the system uses the{" "}
            <strong>WHO 2007 Growth Reference</strong>. Measurements are
            converted into age- and sex-specific Z-scores.
          </p>

          <div className="mt-4 space-y-5">
            {/* WFA */}
            <div>
              <h5 className="font-medium text-foreground">
                Weight-for-Age (WFA)
              </h5>

              <p className="mt-1">
                The system calculates WFA only through{" "}
                <strong>120 completed months (10 years)</strong>. After that
                age, WHO does not provide WFA data for this implementation.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 →{" "}
                  <strong>Severe Underweight</strong>
                </li>
                <li>
                  Z-score below −2 → <strong>Underweight</strong>
                </li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>

            {/* HFA */}
            <div>
              <h5 className="font-medium text-foreground">
                Height-for-Age (HFA)
              </h5>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 → <strong>Severe Stunting</strong>
                </li>
                <li>Z-score below −2 → <strong>Stunting</strong></li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>

            {/* BFA */}
            <div>
              <h5 className="font-medium text-foreground">
                BMI-for-Age (BFA)
              </h5>

              <p className="mt-1">
                BMI is calculated using the person's weight and height, then
                compared with the WHO 2007 BMI-for-age reference.
              </p>

              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Z-score below −3 → <strong>Severe Thinness</strong>
                </li>
                <li>Z-score below −2 → <strong>Thinness</strong></li>
                <li>Z-score above +2 → <strong>Obesity</strong></li>
                <li>Z-score above +1 → <strong>Overweight</strong></li>
                <li>Otherwise → <strong>Normal</strong></li>
              </ul>
            </div>

            {/* <div className="rounded-md border bg-muted/30 p-3 text-xs">
              <strong className="text-foreground">Important:</strong> The
              system does not calculate Weight-for-Length/Height (WFL/WFH) for
              the WHO 5–19 year reference.
            </div> */}
          </div>
        </div>

        {/* ADULT */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-foreground mb-2">
            3. Adults
          </h4>

          <p>
            For adults, pediatric WHO growth Z-score indicators are not used.
            The system classifies nutrition status using calculated{" "}
            <strong>Body Mass Index (BMI)</strong>.
          </p>

          <div className="mt-4">
            <ul className="list-disc list-inside space-y-1">
              <li>
                BMI below 16 → <strong>Severe Underweight</strong>
              </li>
              <li>
                BMI below 18.5 → <strong>Underweight</strong>
              </li>
              <li>
                BMI 18.5 to below 25 → <strong>Normal</strong>
              </li>
              <li>
                BMI 25 to below 30 → <strong>Overweight</strong>
              </li>
              <li>
                BMI 30 or higher → <strong>Obesity</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* HOW Z-SCORES WORK */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-foreground mb-2">
            4. How WHO Z-Scores Are Used
          </h4>

          <p>
            The system does not classify children using one fixed weight,
            height, or BMI number. Instead, it compares each measurement with
            the appropriate WHO reference based on factors such as:
          </p>

          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Age</li>
            <li>Sex</li>
            <li>Weight</li>
            <li>Height or length</li>
            <li>The specific WHO anthropometric indicator</li>
          </ul>

          <p className="mt-3">
            The resulting Z-score determines the classification according to
            the thresholds shown above.
          </p>
        </div>

        {/* OVERALL STATUS */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-foreground mb-2">
            5. Overall Nutrition Status
          </h4>

          <p>
            The overall nutrition status shown by the application is a summary
            generated from the available anthropometric indicators.
          </p>

          <div className="mt-3 rounded-md border bg-muted/30 p-3">
            <p className="text-xs">
              <strong className="text-foreground">Note:</strong> This overall
              result is an application-level summary and is not itself a
              separate official WHO anthropometric indicator.
            </p>
          </div>
        </div>

        {/* DISCLAIMER */}
        {/* <div className="text-xs text-muted-foreground pt-4 border-t">
          ⚠ This assessment is intended for nutrition screening and monitoring.
          Results should be interpreted together with appropriate clinical
          assessment and professional health advice.
        </div> */}
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* MALNUTRITION CAUSE GUIDE                                                   */
/* -------------------------------------------------------------------------- */

const MalnutritionCauseGuide = () => {
  return (
    <Card className="bmms-card border border-muted">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Search className="h-5 w-5 text-primary" />
          Possible Causes of Nutrition Problems
        </CardTitle>

        <p className="text-center text-muted-foreground text-sm">
          Possible contributing factors identified from the available
          questionnaire information
        </p>
      </CardHeader>

      <CardContent className="space-y-6 text-sm text-muted-foreground">
        {/* Undernutrition */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">
            1. Possible Causes of Undernutrition
          </h4>

          <p>
            When nutrition indicators suggest undernutrition, the system may
            identify possible contributing factors from the available
            questionnaire information.
          </p>

          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Insufficient food intake</strong> — if the person does
              not regularly receive enough food.
            </li>

            <li>
              <strong>Poor dietary variety</strong> — if meals lack sufficient
              variety or nutrient-rich foods.
            </li>

            <li>
              <strong>Frequent illness or infection</strong> — if there was
              recent sickness.
            </li>

            <li>
              <strong>Unsafe water or poor sanitation</strong> — if clean
              drinking water is unavailable.
            </li>

            <li>
              <strong>Lack of breastfeeding</strong> — if an infant is not
              breastfed.
            </li>
          </ul>
        </div>

        {/* Overweight */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">
            2. Possible Causes of Overweight or Obesity
          </h4>

          <p>
            When the computed indicators show overweight or obesity, the system
            may also identify possible factors related to excess energy intake
            and lifestyle.
          </p>

          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>High calorie intake with poor diet balance</strong> —
              consuming energy-dense foods while having limited dietary
              variety.
            </li>

            <li>
              <strong>Sedentary lifestyle or overeating</strong> — when
              physical activity is limited or energy intake is excessive.
            </li>
          </ul>
        </div>

        {/* Fallback */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">
            3. No Identified Cause
          </h4>

          <p>
            If the questionnaire does not indicate a clear contributing factor,
            the system may report:
          </p>

          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>
              <em>No significant cause detected based on questionnaire</em>
            </span>
          </div>
        </div>

        {/* <div className="text-xs text-muted-foreground pt-2 border-t">
          ⚠ Identified causes are intended to guide nutrition counseling and
          follow-up. They do not establish a medical diagnosis or assign blame.
        </div> */}
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* GUIDANCE TOPICS                                                            */
/* -------------------------------------------------------------------------- */

const guidanceTopics = [
  {
    id: "prevention-wasting",
    title: "Prevention of Wasting & Malnutrition",
    icon: BookOpen,
    content: {
      overview:
        "According to the World Health Organization (WHO, 2023), preventing wasting and undernutrition in children under 5 is a global health priority. Early detection, breastfeeding support, diverse local diets, and sanitation improvements are important preventive measures.",

      definitions: [
        {
          term: "Wasting",
          definition:
            "Low weight relative to a child's length or height according to the applicable growth reference.",
        },
        {
          term: "Severe Acute Malnutrition (SAM)",
          definition:
            "A severe form of acute malnutrition that requires appropriate assessment and management.",
        },
        {
          term: "Moderate Acute Malnutrition (MAM)",
          definition:
            "A nutritional condition below the normal growth range that requires monitoring and appropriate nutrition support.",
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
        "A balanced diet includes different food groups that provide energy, protein, vitamins, and minerals needed for growth and health.",

      tips: [
        "Include grains such as rice, corn, and root crops as energy sources.",
        "Include protein sources such as fish, chicken, eggs, beans, or other locally available foods.",
        "Eat a variety of vegetables and fruits.",
        "Include calcium-rich foods when available.",
        "Limit highly processed foods, excess salt, and sugary drinks.",
      ],

      localFoods: [
        "Malunggay (Moringa) — a nutrient-rich leafy vegetable.",
        "Sweet potato — a source of energy and nutrients.",
        "Mung beans — a plant-based source of protein.",
        "Guava — a fruit rich in nutrients.",
        "Sardines — a source of protein and other nutrients.",
      ],
    },
  },

  {
    id: "hydration",
    title: "Proper Hydration",
    icon: Droplets,
    content: {
      overview:
        "Adequate fluid intake supports normal body functions including digestion, nutrient transport, and temperature regulation.",

      tips: [
        "Drink safe and clean water regularly.",
        "Increase fluid intake during hot weather or physical activity when appropriate.",
        "Infants under 6 months should receive appropriate infant feeding according to recommended practices.",
        "Limit sugary drinks.",
      ],

      signs: [
        "Dark urine may be a sign of inadequate hydration.",
        "Dry mouth may occur with dehydration.",
        "Fatigue can occur for many reasons and should be assessed appropriately.",
      ],
    },
  },

  {
    id: "proteins",
    title: "Protein Requirements",
    icon: Apple,
    content: {
      overview:
        "Protein is important for growth, tissue repair, immune function, and normal body development.",

      tips: [
        "Include an appropriate protein source in regular meals.",
        "Combine different plant and animal food sources when available.",
        "Fish and eggs can provide useful sources of protein.",
        "Choose foods appropriate for the person's age and nutritional needs.",
      ],

      sources: [
        "Animal proteins: Fish, chicken, eggs, and milk.",
        "Plant proteins: Beans, lentils, nuts, and seeds.",
        "Local combinations: Rice with mung beans or other legumes.",
      ],
    },
  },

  {
    id: "local-foods",
    title: "Local Nutritious Foods",
    icon: Leaf,
    content: {
      overview:
        "Locally available foods can be fresh, affordable, and useful sources of nutrients for families and communities.",

      malunggay: {
        benefits:
          "Malunggay is a nutrient-rich leafy vegetable that can be incorporated into different meals.",
        uses: [
          "Add leaves to soups and stews.",
          "Use leaves in appropriate porridge or vegetable dishes.",
          "Add to omelets or other cooked meals.",
        ],
        nutrients:
          "Contains various nutrients and can contribute to a varied and balanced diet.",
      },

      otherFoods: [
        {
          name: "Kangkong (Water Spinach)",
          benefits: "A leafy vegetable that can contribute nutrients to meals.",
          preparation: "Can be cooked with garlic and other vegetables.",
        },
        {
          name: "Kamote (Sweet Potato)",
          benefits: "Provides energy and nutrients.",
          preparation: "Can be boiled, steamed, or roasted.",
        },
        {
          name: "Sayote (Chayote)",
          benefits: "A vegetable that can be included in varied meals.",
          preparation: "Can be added to soups or stir-fry dishes.",
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
        "Appropriate infant and young child feeding supports healthy growth and development during early childhood.",

      ageGroups: [
        {
          age: "0–6 months",
          guidance:
            "Exclusive breastfeeding is recommended for infants when appropriate and feasible.",
        },
        {
          age: "6–12 months",
          guidance:
            "Continue breastfeeding while gradually introducing appropriate complementary foods.",
        },
        {
          age: "1–2 years",
          guidance:
            "Offer varied family foods with appropriate texture and portions while continuing breastfeeding when applicable.",
        },
        {
          age: "2+ years",
          guidance:
            "Provide regular, varied meals appropriate for the child's age and activity level.",
        },
      ],

      feedingTips: [
        "Introduce age-appropriate foods gradually.",
        "Include nutrient-rich foods when available.",
        "Encourage responsive feeding and allow children to develop appropriate self-feeding skills.",
        "Keep mealtimes supportive and avoid forcing children to eat.",
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN PAGE                                                                  */
/* -------------------------------------------------------------------------- */

const NutritionalGuidancePage = () => {
  const [openTopics, setOpenTopics] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setOpenTopics((prev) =>
      prev.includes(id)
        ? prev.filter((topicId) => topicId !== id)
        : [...prev, id]
    );
  };

  return (
    <AdminPageMain
      title="Nutritional Guidance"
      description="Nutrition education and WHO-based guidance for growth and nutrition monitoring"
    >
      {/* Page Introduction */}
      <Card className="bmms-card">
        <CardHeader>
          <CardTitle className="text-center">
            Nutrition Education and Guidance
          </CardTitle>

          <p className="text-center text-muted-foreground">
            Information on nutrition, healthy feeding practices, and how the
            system computes anthropometric nutrition classifications.
          </p>
        </CardHeader>
      </Card>

      {/* Computation Guide */}
      <NutritionComputationGuide />

      {/* Causes */}
      <MalnutritionCauseGuide />

      {/* Legend */}
      <NutritionLegend />

      {/* Educational Topics */}
      <div className="space-y-4">
        {guidanceTopics.map((topic) => {
          const isOpen = openTopics.includes(topic.id);
          const Icon = topic.icon;

          return (
            <Card key={topic.id} className="bmms-card">
              <Collapsible
                open={isOpen}
                onOpenChange={() => toggleTopic(topic.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">
                          {topic.title}
                        </CardTitle>
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
                    {/* Overview */}
                    <p className="text-muted-foreground">
                      {topic.content.overview}
                    </p>

                    {/* Definitions */}
                    {"definitions" in topic.content &&
                      topic.content.definitions && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Key Definitions:
                          </h4>

                          <ul className="space-y-2 list-disc list-inside">
                            {topic.content.definitions.map((definition, idx) => (
                              <li key={idx}>
                                <strong>{definition.term}:</strong>{" "}
                                {definition.definition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* General Tips */}
                    {"tips" in topic.content && topic.content.tips && (
                      <div>
                        <h4 className="font-semibold mb-3">Helpful Tips:</h4>

                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prevention Tips */}
                    {"preventionTips" in topic.content &&
                      topic.content.preventionTips && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Prevention Tips:
                          </h4>

                          <ul className="space-y-2 list-disc list-inside">
                            {topic.content.preventionTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Local Foods */}
                    {"localFoods" in topic.content &&
                      topic.content.localFoods && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Examples of Local Foods:
                          </h4>

                          <ul className="space-y-2 list-disc list-inside">
                            {topic.content.localFoods.map((food, idx) => (
                              <li key={idx}>{food}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {/* Sources */}
                    {"sources" in topic.content && topic.content.sources && (
                      <div>
                        <h4 className="font-semibold mb-3">
                          Food Sources:
                        </h4>

                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.sources.map((source, idx) => (
                            <li key={idx}>{source}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Signs */}
                    {"signs" in topic.content && topic.content.signs && (
                      <div>
                        <h4 className="font-semibold mb-3">
                          Possible Signs:
                        </h4>

                        <ul className="space-y-2 list-disc list-inside">
                          {topic.content.signs.map((sign, idx) => (
                            <li key={idx}>{sign}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Malunggay */}
                    {"malunggay" in topic.content &&
                      topic.content.malunggay && (
                        <div className="space-y-3">
                          <h4 className="font-semibold">Malunggay</h4>

                          <p>{topic.content.malunggay.benefits}</p>

                          <div>
                            <h5 className="font-medium mb-2">Ways to Use:</h5>

                            <ul className="list-disc list-inside space-y-1">
                              {topic.content.malunggay.uses.map(
                                (use, idx) => (
                                  <li key={idx}>{use}</li>
                                )
                              )}
                            </ul>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {topic.content.malunggay.nutrients}
                          </p>
                        </div>
                      )}

                    {/* Other Foods */}
                    {"otherFoods" in topic.content &&
                      topic.content.otherFoods && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Other Local Foods:
                          </h4>

                          <div className="space-y-3">
                            {topic.content.otherFoods.map((food, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg border p-3"
                              >
                                <h5 className="font-medium">{food.name}</h5>

                                <p className="text-sm mt-1">
                                  <strong>Benefits:</strong> {food.benefits}
                                </p>

                                <p className="text-sm mt-1">
                                  <strong>Preparation:</strong>{" "}
                                  {food.preparation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Age Groups */}
                    {"ageGroups" in topic.content &&
                      topic.content.ageGroups && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Feeding by Age Group:
                          </h4>

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

                    {/* Feeding Tips */}
                    {"feedingTips" in topic.content &&
                      topic.content.feedingTips && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Feeding Tips:
                          </h4>

                          <ul className="space-y-2 list-disc list-inside">
                            {topic.content.feedingTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
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