import AdminPage from '@/components/custom/AdminPage'
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Patient from '@/types/Patient';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import { Save } from 'lucide-react';
import api from '@/api/axios';
import { toast } from '@/hooks/use-toast';
import Questionnaire, { QuestionnaireData } from "../../components/custom/Questionnaire";

type Error = {
    name: string;
    address: string;
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
    const [data, setData] = useState({
        name: "",
        address: "",
        sex: "",
        birthday: "",
        date_measured: "",
        weight: null,
        height: null,
        contact_number: "",
        immunizations: "",
        last_deworming_date: "",
        allergies: "",
        medical_history: "",
        notes: "",
    });

    const [answers, setAnswers] = useState<QuestionnaireData>({
        lowIncome: false,
        recentIllness: false,
        eats3Meals: false,
        eatsVegetables: false,
        cleanWater: false,
        breastfeeding: false,
    });


    const [errors, setErrors] = useState<Error>({
        name: "",
        address: "",
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

    const navigate = useNavigate();
    
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            ...data,
            questionnaire_data: answers,
        }
            
        try {
            const res = await api.post('/patients', formData);

            console.log(res);

            setData({
                name: "",
                address: "",
                sex: "",
                birthday: "",
                date_measured: "",
                weight: null,
                height: null,
                contact_number: "",
                immunizations: "",
                last_deworming_date: "",
                allergies: "",
                medical_history: "",
                notes: "",
            });

            toast({
                title: "Successfully Created"
            })

            setLoading(false);

            navigate(`/${user.role}/patients`);

        } catch (err) {
            setErrors(err.response.data.errors);
            console.log(err);

            setLoading(false);
        }
    }

    return (
        <AdminPage withBackButton={true} title='Add New Patient'>
            <form className='space-y-4' onSubmit={handleSubmit}>
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
                                {errors?.sex && <span className='text-red-500 text-sm'>{errors?.sex}</span>}
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
                                label='Weight (kg)'
                                placeholder="Enter weight"
                                value={data.weight}
                                error={errors?.weight}
                                onChange={handleChange}
                                disabled={loading}
                                step="any"
                            />
                            <InputWithLabel
                                id="height"
                                name='height'
                                type="number"
                                label='Height (cm)'
                                placeholder="Enter height"
                                value={data.height}
                                error={errors?.height}
                                onChange={handleChange}
                                disabled={loading}
                                step="any"
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

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Questionnaire
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Questionnaire data={answers} setData={setAnswers} />
                    </CardContent>
                </Card>

                <div className='w-full justify-end flex'>
                    <div className='flex items-center gap-4'>
                        <Link to={`/${user.role}/patients`}>
                            <Button variant='outline'>
                                Cancel
                            </Button>
                        </Link>
                        <ButtonWithLoading type='submit' loading={loading}>
                            <Save /> Save Patient
                        </ButtonWithLoading>
                    </div>
                </div>
            </form>
        </AdminPage>
    )
}

export default PatientsAddPage
