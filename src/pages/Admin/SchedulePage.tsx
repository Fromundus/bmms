import api from '@/api/axios'
import AdminPageMain from '@/components/custom/AdminPageMain'
import InputWithLabel from '@/components/custom/InputWithLabel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { useDebounce } from '@/hooks/useDeounce'
import Patient from '@/types/Patient'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const fetchPatients = async ({ queryKey }) => {
  const [_key, { search }] = queryKey;

  const res = await api.get("/patients", {
    params: { search, mode: "all" } // load all role-allowed patients
  });

  return res.data.patients.data as Patient[];
};


const SchedulePage = () => {
    const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState<{date: string; location: string}>({
        date: "",
        location: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const debouncedSearch = useDebounce(search);

    const { data: patients, isLoading, isFetching } = useQuery({
        queryKey: ['patients', { search: debouncedSearch }],
        queryFn: fetchPatients,
        enabled: true,
        staleTime: 5 * 60 * 1000,
    });

    const togglePatient = (id: number) => {
        setSelectedPatients(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    console.log(patients);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedPatients.length === 0) {
            toast({ title: "Select at least one patient", variant: "destructive" });
            return;
        }

        setLoading(true);

        try {
            await api.post("/send-schedule", {
                ...data,
                patient_ids: selectedPatients
            });

            toast({ title: "Messages sent successfully" });
            setSelectedPatients([]);
            setData({ date: "", location: "" });
        } catch {
            toast({ title: "Failed to send messages", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };


    return (
        <AdminPageMain title='Schedule Monitoring' description=''>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>
                        Notify Patients
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className='space-y-4' onSubmit={handleSend}>
                        <InputWithLabel
                            name="date"
                            type='date'
                            label='Date'
                            onChange={handleChange}
                            value={data.date}
                            required
                            disabled={loading}
                        />
                        <InputWithLabel
                            name="location"
                            type='text'
                            label='Location'
                            placeholder='Enter location'
                            onChange={handleChange}
                            value={data.location}
                            required
                            disabled={loading}
                        />

                        <InputWithLabel
                            label="Search Patient"
                            type="text"
                            placeholder="Type patient name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            disabled={loading}
                        />


                        <div className="border rounded-md max-h-60 overflow-y-auto p-2">
                            {patients?.map((item) => (
                                <label
                                    key={item.id}
                                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                                >
                                <input
                                    type="checkbox"
                                    checked={selectedPatients.includes(item.id)}
                                    onChange={() => togglePatient(item.id)}
                                />
                                <span>{item.name}</span>
                                </label>
                            ))}
                        </div>


                        <Button disabled={loading}>
                            Send
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AdminPageMain>
    )
}

export default SchedulePage
