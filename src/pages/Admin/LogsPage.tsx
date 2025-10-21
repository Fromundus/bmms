import AdminPageMain from '@/components/custom/AdminPageMain'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from '@/api/axios';
import { Badge } from '@/components/ui/badge';

type Log = {
  id: number;
  action: string;
  ip_address: string;
  user_agent: string;
  logged_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export const getActivityLogs = async (search = "", page = 1) => {
  const res = await api.get("/activity-logs", {
    params: { search, page },
  });
  return res.data;
};

const LogsPage = () => {
    const [logs, setLogs] = React.useState<Log[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [meta, setMeta] = React.useState<{ current_page: number; last_page: number } | null>(null);

    const fetchLogs = async () => {
        setLoading(true);
        try {
        const res = await getActivityLogs(search, page);
        setLogs(res.data);
        setMeta(res.meta);
        } finally {
        setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchLogs();
    }, [page]);

    return (
        <AdminPageMain title='Activity Logs' description=''>
            <Card>
                <CardContent className='p-4'>
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>User Agent</TableHead>
                        <TableHead>Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No logs found.
                            </TableCell>
                        </TableRow>
                        ) : (
                        logs.map((log) => (
                            <TableRow key={log.id}>
                            <TableCell>
                                <div>
                                <p className="font-medium">{log.user.name}</p>
                                <p className="text-sm text-muted-foreground">{log.user.email}</p>
                                </div>
                            </TableCell>
                            <TableCell className="capitalize">
                                <Badge variant={log.action === 'logout' ? 'destructive' : 'default'}>
                                    {log.action}
                                </Badge>
                            </TableCell>
                            <TableCell>{log.ip_address || "—"}</TableCell>
                            <TableCell className="truncate max-w-xs">{log.user_agent}</TableCell>
                            <TableCell>{new Date(log.logged_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                        )}
                    </TableBody>
                    </Table>
                )}

                {meta && (
                    <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                        </PaginationItem>
                        <PaginationItem>
                        <span className="text-sm text-muted-foreground">
                            Page {meta.current_page} of {meta.last_page}
                        </span>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                            className={page === meta.last_page ? "pointer-events-none opacity-50" : ""}
                        />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                )}
                </CardContent>
            </Card>
        </AdminPageMain>
    )
}

export default LogsPage
