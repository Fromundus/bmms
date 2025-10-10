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
      <Card key={item.id}>
        <CardHeader>
          <CardTitle>Physical & Medical Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date Measured</Label>
              <div>{item.date_measured}</div>
            </div>
            <div>
              <Label>Age</Label>
              <div>{item.age}</div>
            </div>
            <div>
              <Label>Weight</Label>
              <div>{item.weight} kg <PatientStatusBadge status={item.weight_for_age} /></div>
            </div>
            <div>
              <Label>Height</Label>
              <div>{item.height} cm <PatientStatusBadge status={item.height_for_age} /></div>
            </div>
            <div>
              <Label>Weight-for-Height</Label>
              <div><PatientStatusBadge status={item.weight_for_ltht_status} /></div>
            </div>
            <div>
              <Label>Immunizations</Label>
              <div>{item.immunizations ?? "None"}</div>
            </div>
            <div>
              <Label>Last Deworming Date</Label>
              <div>{item.last_deworming_date ?? "Not recorded"}</div>
            </div>
            <div>
              <Label>Allergies</Label>
              <div>{item.allergies ?? "None"}</div>
            </div>
            <div>
              <Label>Medical History</Label>
              <div>{item.medical_history ?? "None"}</div>
            </div>
            <div>
              <Label>Notes</Label>
              <div>{item.notes ?? "None"}</div>
            </div>
            <div>
              <Label>Status</Label>
              <div><PatientStatusBadge status={item.status} /></div>
            </div>
          </div>
        </CardContent>
      </Card>
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
      <div className='flex flex-col lg:flex-row gap-4'>
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
          <Card>
            <CardContent className='p-6 flex items-center justify-center text-lg font-semibold'>
              <span className='flex items-center gap-2'><History />Physical & Medical Information History</span>
            </CardContent>
          </Card>
          {renderHistory}
        </div>
      </div>
    </AdminPage>
  )
}

export default PatientHistoryPage
