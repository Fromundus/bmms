import api from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/auth';
import { Value } from '@radix-ui/react-select';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FormData = {
    name: string;
    email: string;
    contact_number: string;
    area: string;
    role: string;
    password: string;
    password_confirmation: string;
}

const Register = () => {
    const { login } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        email: "",
        contact_number: "",
        area: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = React.useState({
        name: "",
        email: "",
        contact_number: "",
        area: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });

        setErrors(null);
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            const res = await api.post('/register', formData);
            console.log(res);
            navigate('/');
            setLoading(false);
        } catch (err: any) {
            setErrors(err.response.data.errors);
            console.log(err);
            setLoading(false);
        }

    };


    return (
        <div className="min-h-screen py-12 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <Card className='max-w-md mx-auto w-full'>
                    <CardHeader className='flex items-center'>
                        <CardTitle>
                            <div className='flex flex-col gap-4 w-full text-center'>
                                <span>Sign up</span>
                                <span className='text-base font-normal text-muted-foreground'>Create Account.</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className='space-y-6'>
                                <InputWithLabel
                                    id="name"
                                    name='name'
                                    type="name"
                                    label='Name'
                                    placeholder="Enter your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors?.name}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="email"
                                    name='email'
                                    type="email"
                                    label='Email'
                                    placeholder="Enter your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors?.email}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="contact_number"
                                    name='contact_number'
                                    type="contact_number"
                                    label='Contact Number'
                                    placeholder="Enter your contact number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    error={errors?.contact_number}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="area"
                                    name='area'
                                    type="area"
                                    label='Area'
                                    placeholder="Enter your area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    error={errors?.area}
                                    disabled={loading}
                                />

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={formData.role} onValueChange={(value) => setFormData((prev) => {
                                        return {
                                            ...prev,
                                            role: value
                                        }
                                    })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bhw">Barangay Health Worker</SelectItem>
                                        <SelectItem value="bns">Barangay Nutrition Scholar</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    {errors?.role && <span className='text-red-500 text-sm'>{errors?.role}</span>}
                                </div>

                                <InputWithLabel
                                    id="password"
                                    name='password'
                                    type="password"
                                    label='Password'
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <InputWithLabel
                                    id="password_confirmation"
                                    name='password_confirmation'
                                    type="password"
                                    label='Confirm Password'
                                    placeholder="Confirm Password"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    error={errors?.password}
                                    disabled={loading}
                                />
                            </div>
                            <div className='w-full flex justify-end text-sm'>
                                
                            </div>
                            <ButtonWithLoading
                                type='submit'
                                disabled={loading}
                                className='w-full'
                                loading={loading}
                            >
                                Login
                            </ButtonWithLoading>
                        </form>
                    </CardContent>
                    <CardFooter className='text-center w-full flex justify-center'>
                        <span>Already have an account? <Link className='font-semibold' to={'/'}>Log in</Link></span>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Register
