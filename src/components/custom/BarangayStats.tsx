
import { useEffect, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import api from "@/api/axios";

interface StatusCount {
  count: number;
  percent: number;
}

interface BarangayStat {
  barangay_id: number | null;
  barangay_name: string;
  total_patients: number;
  severe: StatusCount;
  moderate: StatusCount;
  at_risk: StatusCount;
  healthy: StatusCount;
}

interface BarangayStatsResponse {
  total_barangays: number;
  total_patients: number;
  barangays: BarangayStat[];
}

interface ChartData {
  barangay_name: string;
  severe: number;
  moderate: number;
  at_risk: number;
  healthy: number;
}

const chartConfig = {
  severe: {
    label: "Severe",
    color: "#ef4444",
  },
  moderate: {
    label: "Moderate",
    color: "#f97316",
  },
  at_risk: {
    label: "At Risk",
    color: "#eab308",
  },
  healthy: {
    label: "Healthy",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export default function BarangayStats() {
  const [data, setData] = useState<BarangayStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<BarangayStatsResponse>(
        "barangay-stats"
      );

      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch barangay statistics:", err);
      setError("Failed to load barangay statistics.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo<ChartData[]>(() => {
    if (!data) return [];

    return data.barangays.map((barangay) => ({
      barangay_name: barangay.barangay_name,
      severe: barangay.severe.count,
      moderate: barangay.moderate.count,
      at_risk: barangay.at_risk.count,
      healthy: barangay.healthy.count,
    }));
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading barangay statistics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10">
          <p className="text-sm text-destructive">{error}</p>
          <button
            onClick={fetchStats}
            className="text-sm underline underline-offset-4"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="">
            <CardDescription>Total Barangays</CardDescription>
            <CardTitle className="text-3xl">
              {data.total_barangays}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="">
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className="text-3xl">
              {data.total_patients}
            </CardTitle>
          </CardHeader>
        </Card>
{/* 
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Barangays with Patients</CardDescription>
            <CardTitle className="text-3xl">
              {data.barangays.filter(
                (barangay) => barangay.total_patients > 0
              ).length}
            </CardTitle>
          </CardHeader>
        </Card> */}
      </div>

      {/* Barangay Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Status by Barangay</CardTitle>
          <CardDescription>
            Distribution of patient health status across barangays.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {chartData.length > 0 ? (
            <ChartContainer
              config={chartConfig}
              className="min-h-[350px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="barangay_name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={80}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Bar
                  dataKey="severe"
                  stackId="a"
                  fill="var(--color-severe)"
                  radius={[0, 0, 0, 0]}
                />

                <Bar
                  dataKey="moderate"
                  stackId="a"
                  fill="var(--color-moderate)"
                />

                <Bar
                  dataKey="at_risk"
                  stackId="a"
                  fill="var(--color-at_risk)"
                />

                <Bar
                  dataKey="healthy"
                  stackId="a"
                  fill="var(--color-healthy)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No barangay statistics available.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Chart Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        {Object.entries(chartConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: config.color }}
            />
            <span className="text-muted-foreground">
              {config.label}
            </span>
          </div>
        ))}
      </div>

      {/* Barangay Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Barangay Statistics</CardTitle>
          <CardDescription>
            Detailed patient counts and health status per barangay.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barangay</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Severe</TableHead>
                  <TableHead className="text-center">Moderate</TableHead>
                  <TableHead className="text-center">At Risk</TableHead>
                  <TableHead className="text-center">Healthy</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.barangays.length > 0 ? (
                  data.barangays.map((barangay) => (
                    <TableRow key={barangay.barangay_id ?? "unassigned"}>
                      <TableCell className="font-medium">
                        {barangay.barangay_name}
                      </TableCell>

                      <TableCell className="text-center font-semibold">
                        {barangay.total_patients}
                      </TableCell>

                      <TableCell className="text-center">
                        {barangay.severe.count}
                      </TableCell>

                      <TableCell className="text-center">
                        {barangay.moderate.count}
                      </TableCell>

                      <TableCell className="text-center">
                        {barangay.at_risk.count}
                      </TableCell>

                      <TableCell className="text-center">
                        {barangay.healthy.count}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No barangay data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Individual Barangay Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        {data.barangays.map((barangay) => (
          <Card key={barangay.barangay_id ?? "unassigned"}>
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                <div>
                    <CardTitle className="text-lg">
                    {barangay.barangay_name}
                    </CardTitle>
                    <CardDescription>
                    Patient health status breakdown
                    </CardDescription>
                </div>

                <Badge variant="secondary">
                    {barangay.total_patients} Patients
                </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {(
                [
                    {
                    label: "Severe",
                    status: barangay.severe,
                    color: "bg-red-500",
                    },
                    {
                    label: "Moderate",
                    status: barangay.moderate,
                    color: "bg-orange-500",
                    },
                    {
                    label: "At Risk",
                    status: barangay.at_risk,
                    color: "bg-yellow-500",
                    },
                    {
                    label: "Healthy",
                    status: barangay.healthy,
                    color: "bg-green-500",
                    },
                ]
                ).map(({ label, status, color }) => (
                <div key={label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">
                        {status.count} ({status.percent}%)
                    </span>
                    </div>

                    <Progress
                    value={status.percent}
                    className="h-2"
                        indicatorClassName={color}
                    />
                </div>
                ))}
            </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
