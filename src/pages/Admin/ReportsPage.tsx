import { useEffect, useState } from "react"
import AdminPage from "@/components/custom/AdminPage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts"
import api from "@/api/axios"
import { Activity, Download } from "lucide-react"
import AdminPageMain from "@/components/custom/AdminPageMain"
import { Button } from "@/components/ui/button"
import ipconfig from "@/ipconfig"
import ExportWithDateRange from "@/components/custom/ExportWithDateRange"

type Stats = {
  total_patients: number;
  severe: {
    count: number;
    percent: string;
  };
  moderate: {
    count: number;
    percent: string;
  };
  at_risk: {
    count: number;
    percent: string;
  };
  healthy: {
    count: number;
    percent: string;
  };
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"]

const ReportsPage = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/getStats");
        console.log(res);
        setStats(res.data)
      } catch (err) {
        console.error("Failed to fetch stats", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, []);

  const handleDownload = async (type: "excel" | "pdf", fromDate?: string, toDate?: string) => {
  try {
    const url =
      type === "excel"
        ? `/reports/patients/export/excel`
        : `/reports/patients/export/pdf`;

    const response = await api.get(`${url}`, {
      params: { from_date: fromDate, to_date: toDate },
      responseType: "blob",
    });

    // Create a blob URL
    const blob = new Blob([response.data], {
      type: type === "excel"
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : "application/pdf",
    });

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute(
      "download",
      `patients.${type === "excel" ? "xlsx" : "pdf"}`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl); // Cleanup
  } catch (error) {
    console.error("Download failed:", error);
  }
};

  if (loading) {
    return (
      <AdminPage title="Reports">
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-center text-muted-foreground">Loading reports...</p>
        </div>
      </AdminPage>
    )
  }

  if (!stats) {
    return (
      <AdminPage title="Reports">
        <p className="text-center text-red-500">No data available</p>
      </AdminPage>
    )
  }

  const chartData = [
    { name: "Severe", value: stats.severe.count },
    { name: "Moderate", value: stats.moderate.count },
    { name: "At Risk", value: stats.at_risk.count },
    { name: "Healthy", value: stats.healthy.count },
  ]

  return (
    <AdminPageMain title="Reports & Statistics" description="">
        <Card className="bmms-card">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Malnutrition Overview
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col gap-4">
          <div className="text-center p-4 bg-blue-200 rounded-lg border">
              <div className="text-2xl font-bold text-blue-500">{stats?.total_patients}</div>
              <div className="text-sm text-blue-700">Total Patients</div>
            </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-200 rounded-lg border">
              <div className="text-2xl font-bold text-green-500">{stats?.healthy?.count}</div>
              <div className="text-sm text-green-700">Healthy</div>
            </div>
            <div className="text-center p-4 bg-yellow-200 rounded-lg border">
              <div className="text-2xl font-bold text-yellow-500">{stats?.at_risk?.count}</div>
              <div className="text-sm text-yellow-700">At Risk</div>
            </div>
            <div className="text-center p-4 bg-orange-200 rounded-lg border">
              <div className="text-2xl font-bold text-orange-500">{stats?.moderate?.count}</div>
              <div className="text-sm text-orange-700">Moderate</div>
            </div>
            <div className="text-center p-4 bg-red-200 rounded-lg border">
              <div className="text-2xl font-bold text-red-500">{stats?.severe?.count}</div>
              <div className="text-sm text-red-700">Severe</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row flex-wrap gap-4">
        {/* Pie Chart */}
        <Card className="flex-1">
          <CardHeader><CardTitle>Distribution (Pie Chart)</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bmms-card flex-1 h-full">
            <CardHeader>
            <CardTitle>Malnutrition Severity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Healthy</span>
                <div className="flex items-center gap-2">
                    <div className="w-[100px] bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: stats?.healthy?.percent }}></div>
                    </div>
                    <span className="text-sm">{stats?.healthy?.percent}%</span>
                </div>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-sm font-medium">At Risk</span>
                <div className="flex items-center gap-2">
                    <div className="w-[100px] bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: stats?.at_risk?.percent }}></div>
                    </div>
                    <span className="text-sm">{stats?.at_risk?.percent}%</span>
                </div>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Moderate</span>
                <div className="flex items-center gap-2">
                    <div className="w-[100px] bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: stats?.moderate?.percent }}></div>
                    </div>
                    <span className="text-sm">{stats?.moderate?.percent}%</span>
                </div>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Severe</span>
                <div className="flex items-center gap-2">
                    <div className="w-[100px] bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: stats?.severe?.percent }}></div>
                    </div>
                    <span className="text-sm">{stats?.severe?.percent}%</span>
                </div>
                </div>
            </div>
            </CardContent>
        </Card>

        <Card className="bmms-card w-full">
            <CardHeader>
                <CardTitle>Export Data</CardTitle>
            </CardHeader>
            <CardContent>
                {/* <Button variant="outline" className="h-16 flex flex-col gap-2" onClick={() => handleDownload('excel')}>
                    <Download className="h-6 w-6" />
                    <span>Export to Excel</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-2" onClick={() => handleDownload('pdf')}>
                    <Download className="h-6 w-6" />
                    <span>Export to PDF</span>
                </Button> */}

                <ExportWithDateRange />
            </CardContent>
        </Card>
      </div>
    </AdminPageMain>
  )
}

export default ReportsPage
