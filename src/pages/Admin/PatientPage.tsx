import AdminPage from '@/components/custom/AdminPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Patient from '@/types/Patient'
import { Label } from "@/components/ui/label"
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/auth'
import { useEffect, useState } from 'react'
import api from '@/api/axios'
import { History, PenBox } from 'lucide-react'
import PatientStatusBadge from '@/components/custom/PatientStatusBadge'

const PatientPage = () => {
  const { user } = useAuth()
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/patients/${id}`)
        console.log(res);
        setPatient(res.data)
      } catch (err) {
        console.error("Failed to fetch patient:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPatient()
  }, [id])

  if (loading) {
    return (
      <AdminPage withBackButton={true} title="View Patient">
        <div className="text-center text-muted-foreground">Loading...</div>
      </AdminPage>
    )
  }

  if (!patient) {
    return (
      <AdminPage withBackButton={true} title="View Patient">
        <div className="text-center text-red-500">Patient not found</div>
      </AdminPage>
    )
  }

  return (
    <AdminPage withBackButton={true} title="View Patient" titleAction={
      <div className='flex items-center gap-4'>
        <Link to={`/${user.role}/patients/history/${id}`}>
          <Button variant='outline'>
            <History /> View History
          </Button>
        </Link>
        <Link to={`/${user.role}/patients/edit/${id}`}>
          <Button>
            <PenBox /> Update Patient
          </Button>
        </Link>
      </div>
    }>
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>Age</Label>
              <div>{patient?.latest_record?.age}</div>
            </div>
            <div>
              <Label>Contact Number</Label>
              <div>{patient?.contact_number}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date Measured</Label>
              <div>{patient?.latest_record?.date_measured}</div>
            </div>
            <div>
              <Label>Weight</Label>
              <div>{patient?.latest_record?.weight} kg <PatientStatusBadge status={patient?.latest_record?.weight_for_age} /></div>
            </div>
            <div>
              <Label>Height</Label>
              <div>{patient?.latest_record?.height} cm <PatientStatusBadge status={patient?.latest_record?.height_for_age} /></div>
            </div>
            <div>
              <Label>Weight-for-Height</Label>
              <div><PatientStatusBadge status={patient?.latest_record?.weight_for_ltht_status} /></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical & Health Information */}
      <Card>
        <CardHeader>
          <CardTitle>Medical & Health Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Immunizations</Label>
              <div>{patient?.latest_record?.immunizations ?? "None"}</div>
            </div>
            <div>
              <Label>Last Deworming Date</Label>
              <div>{patient?.latest_record?.last_deworming_date ?? "Not recorded"}</div>
            </div>
            <div>
              <Label>Allergies</Label>
              <div>{patient?.latest_record?.allergies ?? "None"}</div>
            </div>
            <div>
              <Label>Medical History</Label>
              <div>{patient?.latest_record?.medical_history ?? "None"}</div>
            </div>
            <div>
              <Label>Notes</Label>
              <div>{patient?.latest_record?.notes ?? "None"}</div>
            </div>
            <div>
              <Label>Status</Label>
              <div><PatientStatusBadge status={patient?.latest_record?.status} /></div>
            </div>
            {patient?.latest_record?.likely_cause && <div>
              <Label>Likely Cause</Label>
              <div className='text-destructive'>{patient?.latest_record?.likely_cause}</div>
            </div>}
          </div>
        </CardContent>
      </Card>
    </AdminPage>
  )
}

export default PatientPage
