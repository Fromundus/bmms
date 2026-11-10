// import api from '@/api/axios'
// import AdminPageMain from '@/components/custom/AdminPageMain'
// import InputWithLabel from '@/components/custom/InputWithLabel'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { toast } from '@/hooks/use-toast'
// import { useDebounce } from '@/hooks/useDeounce'
// import Patient from '@/types/Patient'
// import { useQuery } from '@tanstack/react-query'
// import React, { useState } from 'react'

// const fetchPatients = async ({ queryKey }) => {
//   const [_key, { search }] = queryKey;

//   const res = await api.get("/patients", {
//     params: { search, mode: "all" } // load all role-allowed patients
//   });

//   return res.data.patients.data as Patient[];
// };


// const SchedulePage = () => {
//     const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
//     const [search, setSearch] = useState("");
//     const [data, setData] = useState<{date: string; location: string}>({
//         date: "",
//         location: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setData((prev) => {
//             return {
//                 ...prev,
//                 [name]: value
//             }
//         })
//     }

//     const debouncedSearch = useDebounce(search);

//     const { data: patients, isLoading, isFetching } = useQuery({
//         queryKey: ['patients', { search: debouncedSearch }],
//         queryFn: fetchPatients,
//         enabled: true,
//         staleTime: 5 * 60 * 1000,
//     });

//     const togglePatient = (id: number) => {
//         setSelectedPatients(prev =>
//             prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
//         );
//     };

//     console.log(patients);

//     const handleSend = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (selectedPatients.length === 0) {
//             toast({ title: "Select at least one resident", variant: "destructive" });
//             return;
//         }

//         setLoading(true);

//         try {
//             await api.post("/send-schedule", {
//                 ...data,
//                 patient_ids: selectedPatients
//             });

//             toast({ title: "Messages sent successfully" });
//             setSelectedPatients([]);
//             setData({ date: "", location: "" });
//         } catch {
//             toast({ title: "Failed to send messages", variant: "destructive" });
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <AdminPageMain title='Schedule Monitoring' description=''>
//             <Card className='w-full'>
//                 <CardHeader>
//                     <CardTitle>
//                         Notify Residents
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form className='space-y-4' onSubmit={handleSend}>
//                         <InputWithLabel
//                             name="date"
//                             type='date'
//                             label='Date'
//                             onChange={handleChange}
//                             value={data.date}
//                             required
//                             disabled={loading}
//                         />
//                         <InputWithLabel
//                             name="location"
//                             type='text'
//                             label='Location'
//                             placeholder='Enter location'
//                             onChange={handleChange}
//                             value={data.location}
//                             required
//                             disabled={loading}
//                         />

//                         <InputWithLabel
//                             label="Search Resident"
//                             type="text"
//                             placeholder="Type resident name..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             disabled={loading}
//                         />


//                         <div className="border rounded-md max-h-60 overflow-y-auto p-2">
//                             {patients?.map((item) => (
//                                 <label
//                                     key={item.id}
//                                     className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
//                                 >
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedPatients.includes(item.id)}
//                                     onChange={() => togglePatient(item.id)}
//                                 />
//                                 <span>{item.name}</span>
//                                 </label>
//                             ))}
//                         </div>


//                         <Button disabled={loading}>
//                             Send
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </AdminPageMain>
//     )
// }

// export default SchedulePage

import api from '@/api/axios'
import AdminPageMain from '@/components/custom/AdminPageMain'
import InputWithLabel from '@/components/custom/InputWithLabel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { useDebounce } from '@/hooks/useDeounce'
import Patient from '@/types/Patient'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const fetchPatients = async ({
    queryKey,
}: {
    queryKey: [string, { search: string }]
}) => {
    const [, { search }] = queryKey

    const res = await api.get('/patients', {
        params: {
            search,
            mode: 'all',
        },
    })

    return res.data.patients.data as Patient[]
}

const SchedulePage = () => {
    const [selectedPatients, setSelectedPatients] = useState<number[]>([])
    const [search, setSearch] = useState('')
    const [data, setData] = useState({
        date: '',
        location: '',
    })
    const [loading, setLoading] = useState(false)

    const selectAllRef = useRef<HTMLInputElement>(null)

    const debouncedSearch = useDebounce(search)

    const {
        data: patients = [],
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['patients', { search: debouncedSearch }],
        queryFn: fetchPatients,
        staleTime: 5 * 60 * 1000,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const togglePatient = (id: number) => {
        setSelectedPatients(prev =>
            prev.includes(id)
                ? prev.filter(patientId => patientId !== id)
                : [...prev, id]
        )
    }

    // Check whether all CURRENTLY DISPLAYED patients are selected
    const allVisibleSelected =
        patients.length > 0 &&
        patients.every(patient => selectedPatients.includes(patient.id))

    // Check whether only some CURRENTLY DISPLAYED patients are selected
    const someVisibleSelected =
        patients.some(patient => selectedPatients.includes(patient.id)) &&
        !allVisibleSelected

    // Display indeterminate state
    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = someVisibleSelected
        }
    }, [someVisibleSelected])

    const handleSelectAll = () => {
        const visiblePatientIds = patients.map(patient => patient.id)

        if (allVisibleSelected) {
            // Remove only currently visible patients
            setSelectedPatients(prev =>
                prev.filter(id => !visiblePatientIds.includes(id))
            )
        } else {
            // Add visible patients without duplicates
            setSelectedPatients(prev => [
                ...new Set([...prev, ...visiblePatientIds]),
            ])
        }
    }

    const selectedCount = useMemo(
        () => selectedPatients.length,
        [selectedPatients]
    )

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()

        if (selectedPatients.length === 0) {
            toast({
                title: 'Select at least one resident',
                description: 'Please choose a resident to notify.',
                variant: 'destructive',
            })
            return
        }

        setLoading(true)

        try {
            await api.post('/send-schedule', {
                ...data,
                patient_ids: selectedPatients,
            })

            toast({
                title: 'Messages sent successfully',
                description: `${selectedPatients.length} resident(s) will be notified.`,
            })

            setSelectedPatients([])
            setData({
                date: '',
                location: '',
            })
            setSearch('')
        } catch {
            toast({
                title: 'Failed to send messages',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminPageMain
            title="Schedule Monitoring"
            description="Set a monitoring schedule and notify selected residents."
        >
            <div className="mx-auto w-full max-w-4xl">
                <Card className="overflow-hidden border shadow-sm">
                    <CardHeader className="border-b bg-muted/30">
                        <div className="flex flex-col gap-1">
                            <CardTitle className="text-xl">
                                Notify Residents
                            </CardTitle>

                            <p className="text-sm text-muted-foreground">
                                Select a date, location, and the residents you
                                want to notify.
                            </p>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <form
                            className="space-y-6"
                            onSubmit={handleSend}
                        >
                            {/* Schedule Details */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <InputWithLabel
                                    name="date"
                                    type="date"
                                    label="Monitoring Date"
                                    onChange={handleChange}
                                    value={data.date}
                                    required
                                    disabled={loading}
                                />

                                <InputWithLabel
                                    name="location"
                                    type="text"
                                    label="Location"
                                    placeholder="Enter monitoring location"
                                    onChange={handleChange}
                                    value={data.location}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Residents Section */}
                            <div className="space-y-3">
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                                    <div>
                                        <h3 className="text-base font-semibold">
                                            Select Residents
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            Choose the residents who should
                                            receive this notification.
                                        </p>
                                    </div>

                                    <span className="text-sm font-medium text-muted-foreground">
                                        {selectedCount} selected
                                    </span>
                                </div>

                                {/* Search */}
                                <InputWithLabel
                                    label="Search Resident"
                                    type="text"
                                    placeholder="Type resident name..."
                                    value={search}
                                    onChange={e =>
                                        setSearch(e.target.value)
                                    }
                                    disabled={loading}
                                />

                                {/* Patient List */}
                                <div className="overflow-hidden rounded-lg border bg-background">
                                    {/* Select All Header */}
                                    <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input
                                                ref={selectAllRef}
                                                type="checkbox"
                                                checked={allVisibleSelected}
                                                onChange={handleSelectAll}
                                                disabled={
                                                    loading ||
                                                    patients.length === 0
                                                }
                                                className="h-4 w-4 cursor-pointer"
                                            />

                                            <span className="text-sm font-medium">
                                                {allVisibleSelected
                                                    ? 'Deselect All'
                                                    : 'Select All'}
                                            </span>
                                        </label>

                                        {isFetching && !isLoading && (
                                            <span className="text-xs text-muted-foreground">
                                                Updating...
                                            </span>
                                        )}
                                    </div>

                                    {/* Loading State */}
                                    {isLoading ? (
                                        <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
                                            Loading residents...
                                        </div>
                                    ) : patients.length === 0 ? (
                                        /* Empty State */
                                        <div className="flex min-h-40 flex-col items-center justify-center gap-1 px-4 text-center">
                                            <p className="font-medium">
                                                No residents found
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                Try searching for a different
                                                name.
                                            </p>
                                        </div>
                                    ) : (
                                        /* Patient List */
                                        <div className="max-h-72 divide-y overflow-y-auto">
                                            {patients.map(item => {
                                                const isSelected =
                                                    selectedPatients.includes(
                                                        item.id
                                                    )

                                                return (
                                                    <label
                                                        key={item.id}
                                                        className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50 ${
                                                            isSelected
                                                                ? 'bg-muted/30'
                                                                : ''
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                isSelected
                                                            }
                                                            onChange={() =>
                                                                togglePatient(
                                                                    item.id
                                                                )
                                                            }
                                                            disabled={loading}
                                                            className="h-4 w-4 cursor-pointer"
                                                        />

                                                        <div className="flex min-w-0 flex-1 flex-col">
                                                            <span className="truncate text-sm font-medium">
                                                                {item.name}
                                                            </span>

                                                            {item.contact_number && (
                                                                <span className="truncate text-xs text-muted-foreground">
                                                                    {item.contact_number}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {isSelected && (
                                                            <span className="text-xs font-medium text-primary">
                                                                Selected
                                                            </span>
                                                        )}
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {selectedCount > 0
                                        ? `${selectedCount} resident${
                                                selectedCount > 1 ? 's' : ''
                                            } will receive a notification.`
                                        : 'No residents selected.'}
                                </p>

                                <Button
                                    type="submit"
                                    disabled={loading || selectedCount === 0}
                                    className="min-w-32"
                                >
                                    {loading
                                        ? 'Sending...'
                                        : `Send to ${selectedCount || ''}${
                                                selectedCount === 1 ? '' : ''
                                            }`}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminPageMain>
    )
}

export default SchedulePage