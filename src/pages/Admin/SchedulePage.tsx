import api from '@/api/axios'
import AdminPageMain from '@/components/custom/AdminPageMain'
import InputWithLabel from '@/components/custom/InputWithLabel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'

const SchedulePage = () => {
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

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post('/send-schedule', data);
            console.log(res);
            setLoading(false);
            toast({
                title: "Successfully Sent"
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <AdminPageMain title='Schedule Monitoring' description=''>
            <Card className='max-w-lg'>
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
