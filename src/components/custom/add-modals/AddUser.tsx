import { toast } from '@/hooks/use-toast';
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import Modal from '../Modal';
import InputWithLabel from '../InputWithLabel';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ButtonWithLoading from '../ButtonWithLoading';
import api from '@/api/axios';

type FormData = {
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
};

type Errors = {
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    password?: string;
};

const AddUser = ({ refetch }: { refetch: () => void }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [addModal, setAddModal] = React.useState(false);
    const [formData, setFormData] = React.useState<FormData>({
        username: "",
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = React.useState<Errors>({
        username: "",
        name: "",
        email: "",
        role: "",
        password: "",
    });

    // console.log(formData);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });

        setErrors((prev) => {
            return {
                ...prev,
                [name]: "",
            }
        });
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            const res = await api.post('/users', formData);
            console.log(res);

            setFormData({
                username: "",
                name: "",
                email: "",
                role: "",
                password: "",
                password_confirmation: "",
            });

            toast({
                title: "Created Successfully"
            });

            refetch();

            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setLoading(false);
        }
    }

    useEffect(() => {
        setFormData({
            username: "",
            name: "",
            email: "",
            role: "",
            password: "",
            password_confirmation: "",
        });
    }, [addModal]);

    return (
        <Modal title={"Add User Account"} buttonLabel={<><Plus/> Add User</>} open={addModal} setOpen={setAddModal} >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='grid grid-cols-2 gap-6'>
                    <InputWithLabel
                        id="username"
                        name='username'
                        type="text"
                        label='Username'
                        placeholder="Enter username"
                        value={formData.username}
                        error={errors?.username}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <InputWithLabel
                        id="name"
                        name='name'
                        type="text"
                        label='Name'
                        placeholder="Enter name"
                        value={formData.name}
                        error={errors?.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <InputWithLabel
                        id="email"
                        name='email'
                        type="email"
                        label='Email'
                        placeholder="Enter email address"
                        value={formData.email}
                        error={errors?.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-3 w-full'>
                            <Label>
                                Role
                            </Label>
                            <Select onValueChange={(value) => setFormData((prev) => {
                                return {
                                    ...prev,
                                    role: value
                                }
                            })} value={formData.role}>
                                <SelectTrigger className="w-full" disabled={loading}>
                                    <SelectValue placeholder="Set role..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="superadmin">Super Admin</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="driver">Driver</SelectItem>
                                    {/* <SelectItem value="user">User</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors?.role && <span className='text-destructive text-sm'>{errors?.role}</span>}
                    </div>
                </div>
                <ButtonWithLoading
                    type='submit'
                    disabled={loading}
                    className='w-full'
                    loading={loading}
                >
                    Create
                </ButtonWithLoading>
            </form>
        </Modal>
    )
}

export default AddUser