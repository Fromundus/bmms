import AdminPage from '@/components/custom/AdminPage'
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Patient from '@/types/Patient';
import React, { ChangeEvent, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import { Save } from 'lucide-react';
import api from '@/api/axios';

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

const PatientsAddPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Patient>({
        name: "",
        address: "",
        belongs_to_ip: "",
        sex: "",
        birthday: "",
        date_measured: "",
        weight: 0,
        height: 0,
        contact_number: "",
        immunizations: "",
        last_deworming_date: "",
        allergies: "",
        medical_history: "",
        notes: "",
    });

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

    const handleSubmit = async () => {
        try {
            const res = await api.post('/', );
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AdminPage withBackButton={true} title='Add New Patient'>
            <form className='space-y-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <InputWithLabel
                                id="name"
                                name='name'
                                type="name"
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
                                type="address"
                                label='Address'
                                placeholder="Enter address"
                                value={data.address}
                                error={errors?.address}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <div className="space-y-2">
                                <Label htmlFor="belongs_to_ip">Belongs to IP</Label>
                                <Select value={data.belongs_to_ip} onValueChange={(value) => setData((prev) => {
                                    return {
                                        ...prev,
                                        belongs_to_ip: value
                                    }
                                })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sex">Sex</Label>
                                <Select value={data.sex} onValueChange={(value) => setData((prev) => {
                                    return {
                                        ...prev,
                                        sex: value
                                    }
                                })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <InputWithLabel
                                id="birthday"
                                name='birthday'
                                type="date"
                                label='Birthday'
                                placeholder="Enter birthday"
                                value={data.birthday}
                                error={errors?.birthday}
                                onChange={handleChange}
                                disabled={loading}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            <InputWithLabel
                                id="contact_number"
                                name='contact_number'
                                type="number"
                                label='Contact Number'
                                placeholder="Enter Contact Number"
                                value={data.contact_number}
                                error={errors?.contact_number}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                        Physical Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <InputWithLabel
                                id="date_measured"
                                name='date_measured'
                                type="date"
                                label='Date Measured'
                                placeholder="Enter date measured"
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
                                placeholder="Enter weight"
                                value={data.weight}
                                error={errors?.weight}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="height"
                                name='height'
                                type="number"
                                label='Height'
                                placeholder="Enter height"
                                value={data.height}
                                error={errors?.height}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Medical & Health Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <InputWithLabel
                                id="immunizations"
                                name='immunizations'
                                type="text"
                                label='Immunizations'
                                placeholder="Enter immunizations"
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
                                placeholder="Enter last deworming date"
                                value={data.last_deworming_date}
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
                                placeholder="Enter allergies"
                                value={data.allergies}
                                error={errors?.allergies}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="medical_history"
                                name='medical_history'
                                type="text"
                                label='Medical_history'
                                placeholder="Enter medical history"
                                value={data.medical_history}
                                error={errors?.medical_history}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="notes"
                                name='notes'
                                type="text"
                                label='Notes'
                                placeholder="Enter notes"
                                value={data.notes}
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
                            <Button variant='outline'>
                                Cancel
                            </Button>
                        </Link>
                        <ButtonWithLoading type='submit'>
                            <Save /> Save Patient
                        </ButtonWithLoading>
                    </div>
                </div>
            </form>
        </AdminPage>
    )
}

export default PatientsAddPage
