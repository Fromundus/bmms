// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { format } from "date-fns";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// interface ReportItem {
//   id: number;
//   created_at: string;
//   total_population: number;
//   chart_data: {
//     adults: any;
//     children: any;
//   };
//   remark: string;
//   recommendations: any[];
// }

// const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444", "#3b82f6"];

// export default function ReportCard({ item }: { item: ReportItem }) {
//   const adults = item.chart_data.adults;
//   const children = item.chart_data.children;

//   const adultData = [
//     { name: "Healthy", value: adults.healthy },
//     { name: "Moderate", value: adults.moderate },
//     { name: "Overweight", value: adults.overweight },
//     { name: "Obese", value: adults.obese },
//     { name: "Severe", value: adults.severe },
//     { name: "Wasted", value: adults.wasted },
//     { name: "At Risk", value: adults.at_risk },
//   ];

//   const childData = [
//     { name: "Healthy", value: children.healthy },
//     { name: "Moderate", value: children.moderate },
//     { name: "Stunted", value: children.stunted },
//     { name: "Underweight", value: children.underweight },
//     { name: "Wasted", value: children.wasted },
//     { name: "Obese", value: children.obese },
//     { name: "Severe", value: children.severe },
//   ];

//   const comparisonData = [
//     { name: "Healthy", adults: adults.healthy, children: children.healthy },
//     { name: "At Risk", adults: adults.at_risk, children: children.at_risk },
//     { name: "Moderate", adults: adults.moderate, children: children.moderate },
//     { name: "Severe", adults: adults.severe, children: children.severe },
//   ];

//   const priorityColor: any = {
//     critical: "destructive",
//     high: "destructive",
//     medium: "secondary",
//     low: "outline",
//   };

//   return (
//     <Card className="border border-primary shadow-xl rounded-2xl">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle>Health Report</CardTitle>
//           <Badge variant="secondary">
//             {format(new Date(item.created_at), "PPp")}
//           </Badge>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* SUMMARY */}
//         <div className="grid md:grid-cols-3 gap-4">
//           <Card className="p-4">
//             <p className="text-sm text-muted-foreground">Population</p>
//             <h2 className="text-2xl font-bold">{item.total_population}</h2>
//           </Card>

//           <Card className="p-4">
//             <p className="text-sm text-muted-foreground">Adults</p>
//             <h2 className="text-2xl font-bold">{adults.total}</h2>
//           </Card>

//           <Card className="p-4">
//             <p className="text-sm text-muted-foreground">Children</p>
//             <h2 className="text-2xl font-bold">{children.total}</h2>
//           </Card>
//         </div>

//         {/* PIE CHARTS */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <Card className="p-4">
//             <h3 className="font-semibold mb-2">Adult Distribution</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie data={adultData} dataKey="value" outerRadius={80}>
//                   {adultData.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>

//           <Card className="p-4">
//             <h3 className="font-semibold mb-2">Children Distribution</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie data={childData} dataKey="value" outerRadius={80}>
//                   {childData.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>
//         </div>

//         {/* BAR CHART */}
//         <Card className="p-4">
//           <h3 className="font-semibold mb-2">Adults vs Children</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={comparisonData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="adults" />
//               <Bar dataKey="children" />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* REMARK */}
//         <Card className="p-4 border-l-4 border-red-500">
//           <h3 className="font-semibold">Summary</h3>
//           <p className="text-sm text-muted-foreground mt-1">{item.remark}</p>
//         </Card>

//         {/* RECOMMENDATIONS */}
//         <div className="space-y-4">
//           {item.recommendations.map((rec, index) => (
//             <Card key={index} className="p-4">
//               <div className="flex justify-between items-center">
//                 <h4 className="font-semibold">{rec.group}</h4>
//                 <Badge variant={priorityColor[rec.priority]}>
//                   {rec.priority}
//                 </Badge>
//               </div>
//               <p className="text-sm mt-2">{rec.message}</p>
//               <ul className="list-disc ml-5 mt-2 text-sm text-muted-foreground">
//                 {rec.actions.map((action: string, i: number) => (
//                   <li key={i}>{action}</li>
//                 ))}
//               </ul>
//             </Card>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ReportItem {
  id: number;
  created_at: string;
  total_population: number;
  chart_data: {
    adults: any;
    children: any;
  };
  remark: string;
  recommendations: any[];
}

// const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444", "#3b82f6"];

export const STATUS_COLORS: Record<string, string> = {
    // GREEN
    Healthy: "#22c55e",
    Normal: "#22c55e",

    // YELLOW
    "At Risk": "#eab308",
    Underweight: "#eab308",

    // ORANGE
    Moderate: "#f97316",
    Overweight: "#f97316",
    Wasted: "#f97316",
    Stunted: "#f97316",
    "Mildly Underweight": "#f97316",
    Tall: "#f97316",

    // RED
    Severe: "#ef4444",
    Obese: "#ef4444",
    "Severely Underweight": "#ef4444",
    "Severely Stunted": "#ef4444",
    "Severely Wasted": "#ef4444",
};

export default function ReportCard({ item }: { item: ReportItem }) {
  const adults = item.chart_data.adults;
  const children = item.chart_data.children;

  const adultData = [
    { name: "Healthy", value: adults.healthy },
    { name: "Moderate", value: adults.moderate },
    // { name: "Overweight", value: adults.overweight },
    // { name: "Obese", value: adults.obese },
    { name: "Severe", value: adults.severe },
    // { name: "Wasted", value: adults.wasted },
    { name: "At Risk", value: adults.at_risk },
  ];

  const childData = [
    { name: "Healthy", value: children.healthy },
    { name: "Moderate", value: children.moderate },
    // { name: "Stunted", value: children.stunted },
    // { name: "Underweight", value: children.underweight },
    // { name: "Wasted", value: children.wasted },
    // { name: "Obese", value: children.obese },
    { name: "Severe", value: children.severe },
    { name: "At Risk", value: children.at_risk },
  ];

  const comparisonData = [
    { name: "Healthy", adults: adults.healthy, children: children.healthy },
    { name: "At Risk", adults: adults.at_risk, children: children.at_risk },
    { name: "Moderate", adults: adults.moderate, children: children.moderate },
    { name: "Severe", adults: adults.severe, children: children.severe },
  ];

  const priorityColor: any = {
    critical: "destructive",
    high: "destructive",
    medium: "secondary",
    low: "outline",
  };

  const renderInsideLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="border border-primary shadow-md rounded-xl">
      <CardHeader className="py-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Health Report</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {format(new Date(item.created_at), "PP")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 border rounded-lg">
            <p className="text-xs text-muted-foreground">Population</p>
            <h2 className="text-lg font-semibold">{item.total_population}</h2>
          </div>

          <div className="p-2 border rounded-lg">
            <p className="text-xs text-muted-foreground">Adults</p>
            <h2 className="text-lg font-semibold">{adults.total}</h2>
          </div>

          <div className="p-2 border rounded-lg">
            <p className="text-xs text-muted-foreground">Children</p>
            <h2 className="text-lg font-semibold">{children.total}</h2>
          </div>
        </div>

        {/* PIE CHARTS */}
        <div className="flex items-center gap-4">
          <div className="p-2 border rounded-lg w-full">
            <h3 className="text-xs font-medium mb-1">Adults</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                {/* <Pie data={adultData} dataKey="value" outerRadius={60} label={({ name, value }) => `${name}: ${value}`}> */}
                <Pie
                  data={adultData}
                  dataKey="value"
                  outerRadius={80}
                  label={renderInsideLabel}
                  labelLine={false}
                >
                  {adultData.map((entry, index) => (
                    // <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    <Cell
                      key={index}
                      fill={STATUS_COLORS[entry.name] || "#94a3b8"} // fallback gray
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 text-nowrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#22c55e]"></div>
              <div className="text-[11px]">
                <p className="font-semibold">Healthy</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#eab308]"></div>
              <div className="text-[11px]">
                <p className="font-semibold">At Risk</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f97316]"></div>
              <div className="text-[11px]">
                <p className="font-semibold">Moderate</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444]"></div>
              <div className="text-[11px]">
                <p className="font-semibold">Severe</p>
              </div>
            </div>
          </div>

          <div className="p-2 border rounded-lg w-full">
            <h3 className="text-xs font-medium mb-1">Children</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                  <Pie
                    data={childData}
                    dataKey="value"
                    outerRadius={80}
                    label={renderInsideLabel}
                    labelLine={false}
                  >
                  {childData.map((entry, index) => (
                    // <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    <Cell
                      key={index}
                      fill={STATUS_COLORS[entry.name] || "#94a3b8"} // fallback gray
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="p-2 border rounded-lg">
          <h3 className="text-xs font-medium mb-4">Comparison</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />

              <Bar dataKey="adults" label={{ position: "top", fontSize: 13 }}>
                {comparisonData.map((entry, index) => (
                  <Cell
                    key={`adult-${index}`}
                    fill={STATUS_COLORS[entry.name] || "#94a3b8"}
                  />
                ))}
              </Bar>

              <Bar dataKey="children" label={{ position: "top", fontSize: 13 }}>
                {comparisonData.map((entry, index) => (
                  <Cell
                    key={`child-${index}`}
                    fill={STATUS_COLORS[entry.name] || "#94a3b8"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* REMARK */}
        <div className="p-2 border-l-2 border-blue-500 bg-muted/30 rounded">
          <p className="text-xs font-medium">Summary</p>
          <p className="text-xs text-muted-foreground">{item.remark}</p>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="space-y-2">
          {item.recommendations.map((rec, index) => (
            <div key={index} className="p-2 border rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold">{rec.group}</p>
                {/* <Badge variant={priorityColor[rec.priority]} className="text-[10px] px-2 py-0">
                  {rec.priority}
                </Badge> */}
              </div>
              <p className="text-xs mt-1">{rec.message}</p>
              <ul className="list-disc ml-4 mt-1 text-xs text-muted-foreground">
                {rec.actions.map((action: string, i: number) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}