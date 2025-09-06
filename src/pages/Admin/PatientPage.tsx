import AdminPage from '@/components/custom/AdminPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Patient from '@/types/Patient'
import { Label } from "@/components/ui/label"
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/auth'
import { useEffect, useState } from 'react'
import api from '@/api/axios'
import { PenBox } from 'lucide-react'
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
        <p className="text-center text-muted-foreground">Loading...</p>
      </AdminPage>
    )
  }

  if (!patient) {
    return (
      <AdminPage withBackButton={true} title="View Patient">
        <p className="text-center text-red-500">Patient not found</p>
      </AdminPage>
    )
  }

  return (
    <AdminPage withBackButton={true} title="View Patient" titleAction={
      <Link to={`/${user.role}/patients/edit/${id}`}>
        <Button>
          <PenBox /> Update
        </Button>
      </Link>
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
              <p>{patient.name}</p>
            </div>
            <div>
              <Label>Address</Label>
              <p>{patient.address}</p>
            </div>
            <div>
              <Label>Belongs to IP</Label>
              <p>{patient.belongs_to_ip}</p>
            </div>
            <div>
              <Label>Sex</Label>
              <p>{patient.sex}</p>
            </div>
            <div>
              <Label>Birthday</Label>
              <p>{patient.birthday}</p>
            </div>
            <div>
              <Label>Contact Number</Label>
              <p>{patient.contact_number}</p>
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
              <p>{patient.date_measured}</p>
            </div>
            <div>
              <Label>Weight</Label>
              <p>{patient.weight} kg <PatientStatusBadge status={patient.weight_for_age} /></p>
            </div>
            <div>
              <Label>Height</Label>
              <p>{patient.height} cm <PatientStatusBadge status={patient.height_for_age} /></p>
            </div>
            <div>
              <Label>Weight-for-Height</Label>
              <p><PatientStatusBadge status={patient.weight_for_ltht_status} /></p>
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
              <p>{patient.immunizations}</p>
            </div>
            <div>
              <Label>Last Deworming Date</Label>
              <p>{patient.last_deworming_date ?? "Not recorded"}</p>
            </div>
            <div>
              <Label>Allergies</Label>
              <p>{patient.allergies ?? "None"}</p>
            </div>
            <div>
              <Label>Medical History</Label>
              <p>{patient.medical_history ?? "None"}</p>
            </div>
            <div>
              <Label>Notes</Label>
              <p>{patient.notes}</p>
            </div>
            <div>
              <Label>Status</Label>
              <p><PatientStatusBadge status={patient.status} /></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminPage>
  )
}

export default PatientPage
