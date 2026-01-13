import AdminPage from '@/components/custom/AdminPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Patient, { PatientRecord } from '@/types/Patient'
import { Label } from "@/components/ui/label"
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/auth'
import { useEffect, useState } from 'react'
import api from '@/api/axios'
import { History, PenBox } from 'lucide-react'
import PatientStatusBadge from '@/components/custom/PatientStatusBadge'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const PatientHistoryPage = () => {
  const { user } = useAuth()
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<PatientRecord[]>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/patients/history/${id}`)
        console.log(res);
        setPatient(res.data);
        setRecords(res.data.records);
      } catch (err) {
        console.error("Failed to fetch patient:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPatient()
  }, [id]);

  const renderHistory = records?.map((item) => {
    return (
      <TableRow key={item?.id}>
        <TableCell>{item?.date_measured}</TableCell>
        <TableCell>{item?.weight}</TableCell>
        <TableCell>{item?.height}</TableCell>
        <TableCell>{item?.age}</TableCell>
        <TableCell><PatientStatusBadge status={item?.weight_for_age} /></TableCell>
        <TableCell><PatientStatusBadge status={item?.height_for_age} /></TableCell>
        <TableCell><PatientStatusBadge status={item?.weight_for_ltht_status} /></TableCell>

        <TableCell><PatientStatusBadge status={item?.status} /></TableCell>
        <TableCell className='text-destructive'>{item?.likely_cause}</TableCell>
      </TableRow>
    )
  })

  if (loading) {
    return (
      <AdminPage withBackButton={true} title="View History">
        <div className="text-center text-muted-foreground">Loading...</div>
      </AdminPage>
    )
  }

  if (!patient) {
    return (
      <AdminPage withBackButton={true} title="View History">
        <div className="text-center text-red-500">Patient not found</div>
      </AdminPage>
    )
  }

  return (
    <AdminPage withBackButton={true} title="View History">
      {/* Personal Information */}
      <div className='flex flex-col gap-4'>
        <Card className='h-fit w-full'>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Name</Label>
                <div>{patient?.name}</div>
              </div>
              <div>
                <Label>Address</Label>
                <div>{patient?.address}</div>
              </div>
              <div>
                <Label>Sex</Label>
                <div>{patient?.sex}</div>
              </div>
              <div>
                <Label>Birthday</Label>
                <div>{patient?.birthday}</div>
              </div>
              <div>
                <Label>Contact Number</Label>
                <div>{patient?.contact_number}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='flex flex-col gap-4 w-full'>
          {/* <Card>
            <CardContent className='p-6 flex items-center justify-center text-lg font-semibold'>
              <span className='flex items-center gap-2'><History />Physical & Medical Information History</span>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <History /> Physical & Medical Information History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Measured</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Height</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Weight for Age Status</TableHead>
                    <TableHead>Height for Age Status</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>Overall Status</TableHead>
                    <TableHead>Likely Cause</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={15} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : records.length > 0 ? (
                    renderHistory
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15} className="text-center">
                        No History found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPage>
  )
}

export default PatientHistoryPage
