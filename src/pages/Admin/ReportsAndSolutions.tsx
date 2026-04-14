import api from '@/api/axios';
import ReportCard from '@/components/custom/ReportCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns';
import React from 'react'

const fetchReports = async ({ queryKey }) => {
    const [_key] = queryKey;
    const res = await api.get('/summaries');

    return res.data;
}

const ReportsAndSolutions = () => {
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['reports'],
        queryFn: fetchReports,
        enabled: true,
        staleTime: 5 * 60 * 1000,
    });

    const reports = data ?? [];

    return (
        <div className="space-y-6">
            <div className="flex gap-6 flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Reports</h2>
                    {/* <p className="text-muted-foreground">Reports built on DSS and data-driven analysis</p> */}
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>
                        List of Reports
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : reports?.length ? reports.map((item) => {
                        return (
                            // <Card key={item.id} className='border border-primary'>
                            //     <CardHeader>
                            //         <CardTitle>
                            //             Generated on {format(new Date(item.created_at), 'PPp')}
                            //         </CardTitle>
                            //     </CardHeader>
                            //     <CardContent>
                                    
                            //     </CardContent>
                            // </Card>

                            <ReportCard item={item} />
                        )
                    }) : (
                        <span>No reports found.</span>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ReportsAndSolutions
