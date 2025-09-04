import AdminPage from '@/components/custom/AdminPage'
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Patient from '@/types/Patient';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import { Save } from 'lucide-react';
import api from '@/api/axios';
import { toast } from '@/hooks/use-toast';

type Error = {
    name: string;
    address: string;
    belongs_to_ip: string;
    sex: string;
    birthday: string;
    date_measured: string;
    weight: string;
    height: string;
    contact_number: string;

    immunizations: string;
    last_deworming_date: string;
    allergies: string;
    medical_history: string;
    notes: string;
}

const PatientsEditPage = () => {
    const { user } = useAuth();
    const { id } = useParams(); // get patient id from url
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Patient | null>(null);

    const [errors, setErrors] = useState<Error>({
        name: "",
        address: "",
        belongs_to_ip: "",
        sex: "",
        birthday: "",
        date_measured: "",
        weight: "",
        height: "",
        contact_number: "",
        immunizations: "",
        last_deworming_date: "",
        allergies: "",
        medical_history: "",
        notes: "",
    });

    // Fetch patient data when page loads
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await api.get(`/patients/${id}`);
                setData(res.data);
            } catch (err) {
                console.error(err);
                toast({ title: "Error loading patient data", variant: "destructive" });
            }
        };
        fetchPatient();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => prev ? { ...prev, [name]: value } : prev);

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/patients/${id}`, data);

            toast({ title: "Successfully Updated" });
            navigate(`/${user.role}/patients`);
        } catch (err: any) {
            setErrors(err.response?.data?.errors || {});
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!data) {
        return (
            <AdminPage withBackButton={true} title="Edit Patient">
                <p>Loading patient data...</p>
            </AdminPage>
        );
    }

    return (
        <AdminPage withBackButton={true} title='Edit Patient'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <InputWithLabel
                                id="name"
                                name='name'
                                type="text"
                                label='Name'
                                placeholder="Enter name"
                                value={data.name}
                                error={errors?.name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="address"
                                name='address'
                                type="text"
                                label='Address'
                                placeholder="Enter address"
                                value={data.address}
                                error={errors?.address}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <div className="space-y-2">
                                <Label htmlFor="belongs_to_ip">Belongs to IP</Label>
                                <Select
                                    value={data.belongs_to_ip}
                                    onValueChange={(value) => setData((prev) => prev ? { ...prev, belongs_to_ip: value } : prev)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Yes">Yes</SelectItem>
                                        <SelectItem value="No">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors?.belongs_to_ip && <span className='text-red-500 text-sm'>{errors?.belongs_to_ip}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sex">Sex</Label>
                                <Select
                                    value={data.sex}
                                    onValueChange={(value) => setData((prev) => prev ? { ...prev, sex: value } : prev)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors?.sex && <span className='text-red-500 text-sm'>{errors?.sex}</span>}
                            </div>
                            <InputWithLabel
                                id="birthday"
                                name='birthday'
                                type="date"
                                label='Birthday'
                                value={data.birthday}
                                error={errors?.birthday}
                                onChange={handleChange}
                                disabled={loading}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            <InputWithLabel
                                id="contact_number"
                                name='contact_number'
                                type="string"
                                label='Contact Number'
                                placeholder="Enter Contact Number"
                                value={data.contact_number}
                                error={errors?.contact_number}
                                onChange={handleChange}
                                disabled={loading}
                                minLength={11}
                                maxLength={11}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Physical Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <InputWithLabel
                                id="date_measured"
                                name='date_measured'
                                type="date"
                                label='Date Measured'
                                value={data.date_measured}
                                error={errors?.date_measured}
                                onChange={handleChange}
                                disabled={loading}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            <InputWithLabel
                                id="weight"
                                name='weight'
                                type="number"
                                label='Weight'
                                value={data.weight ?? ""}
                                error={errors?.weight}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="height"
                                name='height'
                                type="number"
                                label='Height'
                                value={data.height ?? ""}
                                error={errors?.height}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Medical & Health Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <InputWithLabel
                                id="immunizations"
                                name='immunizations'
                                type="text"
                                label='Immunizations'
                                value={data.immunizations}
                                error={errors?.immunizations}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="last_deworming_date"
                                name='last_deworming_date'
                                type="date"
                                label='Deworming History'
                                value={data.last_deworming_date || ""}
                                error={errors?.last_deworming_date}
                                onChange={handleChange}
                                disabled={loading}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            <InputWithLabel
                                id="allergies"
                                name='allergies'
                                type="text"
                                label='Allergies'
                                value={data.allergies || ""}
                                error={errors?.allergies}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="medical_history"
                                name='medical_history'
                                type="text"
                                label='Medical History'
                                value={data.medical_history || ""}
                                error={errors?.medical_history}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="notes"
                                name='notes'
                                type="text"
                                label='Notes'
                                value={data.notes || ""}
                                error={errors?.notes}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className='w-full justify-end flex'>
                    <div className='flex items-center gap-4'>
                        <Link to={`/${user.role}/patients`}>
                            <Button variant='outline'>Cancel</Button>
                        </Link>
                        <ButtonWithLoading type='submit' loading={loading}>
                            <Save /> Update Patient
                        </ButtonWithLoading>
                    </div>
                </div>
            </form>
        </AdminPage>
    )
}

export default PatientsEditPage
