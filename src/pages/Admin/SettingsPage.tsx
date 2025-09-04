import AdminPageMain from '@/components/custom/AdminPageMain'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import InputWithLabel from '@/components/custom/InputWithLabel';
import api from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';

type Treshold = {
    wfa_underweight: number;
    wfa_normal: number;
    wfa_overweight: number;
    hfa_stunted: number;
    hfa_normal: number;
    hfa_tall: number;
    wfs_wasted: number;
    wfs_normal: number;
    wfs_obese: number;
} | null;

type Error = {
    wfa_underweight: string;
    wfa_normal: string;
    wfa_overweight: string;
    hfa_stunted: string;
    hfa_normal: string;
    hfa_tall: string;
    wfs_wasted: string;
    wfs_normal: string;
    wfs_obese: string;
} | null;

const SettingsPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Treshold>({
        wfa_underweight: 0,
        wfa_normal: 0,
        wfa_overweight: 0,
        hfa_stunted: 0,
        hfa_normal: 0,
        hfa_tall: 0,
        wfs_wasted: 0,
        wfs_normal: 0,
        wfs_obese: 0,
    });

    const [errors, setErrors] = useState<Error>({
        wfa_underweight: "",
        wfa_normal: "",
        wfa_overweight: "",
        hfa_stunted: "",
        hfa_normal: "",
        hfa_tall: "",
        wfs_wasted: "",
        wfs_normal: "",
        wfs_obese: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });

        setErrors((prev) => {
            return {
                ...prev,
                [name]: ""
            }
        });
    }

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await api.get('/settings');

            setData({
                wfa_underweight: res.data.wfa_underweight,
                wfa_normal: res.data.wfa_normal,
                wfa_overweight: res.data.wfa_overweight,
                hfa_stunted: res.data.hfa_stunted,
                hfa_normal: res.data.hfa_normal,
                hfa_tall: res.data.hfa_tall,
                wfs_wasted: res.data.wfs_wasted,
                wfs_normal: res.data.wfs_normal,
                wfs_obese: res.data.wfs_obese,
            });

            console.log(res);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings()
    }, []);

    const handleThresholdsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            const res = await api.post('/settings', data);
            console.log(res);
            setLoading(false);
            toast({
                title: "Alert Thresholds Updated",
                description: "Alert thresholds have been successfully saved.",
            });
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setLoading(false);
        }

    };

    return (
        <AdminPageMain title='System Settings' description='Manage System Settings'>
            <Card className="bmms-card">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Malnutrition Alert Thresholds
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Set the threshold values that trigger different malnutrition severity levels
                </p>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleThresholdsSubmit} className="space-y-6">
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-4'>
                            <Label className='text-lg'>
                                Weight for Age
                            </Label>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                <InputWithLabel
                                    id="wfa_underweight"
                                    name='wfa_underweight'
                                    type="number"
                                    label='Underweight'
                                    placeholder="Enter value"
                                    value={data.wfa_underweight}
                                    error={errors?.wfa_underweight}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="wfa_normal"
                                    name='wfa_normal'
                                    type="number"
                                    label='Normal'
                                    placeholder="Enter value"
                                    value={data.wfa_normal}
                                    error={errors?.wfa_normal}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="wfa_overweight"
                                    name='wfa_overweight'
                                    type="number"
                                    label='Overweight'
                                    placeholder="Enter value"
                                    value={data.wfa_overweight}
                                    error={errors?.wfa_overweight}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label className='text-lg'>
                                Heigth for Age
                            </Label>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                <InputWithLabel
                                    id="hfa_stunted"
                                    name='hfa_stunted'
                                    type="number"
                                    label='Stunted'
                                    placeholder="Enter value"
                                    value={data.hfa_stunted}
                                    error={errors?.hfa_stunted}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="hfa_normal"
                                    name='hfa_normal'
                                    type="number"
                                    label='Normal'
                                    placeholder="Enter value"
                                    value={data.hfa_normal}
                                    error={errors?.hfa_normal}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="hfa_tall"
                                    name='hfa_tall'
                                    type="number"
                                    label='Tall'
                                    placeholder="Enter value"
                                    value={data.hfa_tall}
                                    error={errors?.hfa_tall}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label className='text-lg'>
                                Weight for Age
                            </Label>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                <InputWithLabel
                                    id="wfs_wasted"
                                    name='wfs_wasted'
                                    type="number"
                                    label='Wasted'
                                    placeholder="Enter value"
                                    value={data.wfs_wasted}
                                    error={errors?.wfs_wasted}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="wfs_normal"
                                    name='wfs_normal'
                                    type="number"
                                    label='Normal'
                                    placeholder="Enter value"
                                    value={data.wfs_normal}
                                    error={errors?.wfs_normal}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="wfs_obese"
                                    name='wfs_obese'
                                    type="number"
                                    label='Obese'
                                    placeholder="Enter value"
                                    value={data.wfs_obese}
                                    error={errors?.wfs_obese}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    <ButtonWithLoading type='submit' loading={loading}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Alert Thresholds
                    </ButtonWithLoading>
                </form>
                </CardContent>
            </Card>
        </AdminPageMain>
    )
}

export default SettingsPage
