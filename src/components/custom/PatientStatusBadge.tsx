import React from 'react'
import { Badge } from '../ui/badge'

const PatientStatusBadge = ({ status }: { status: string }) => {
  return (
    <>
        <Badge className={`
            ${status === "Severe" && "bg-red-500"}    
            ${status === "Moderate" && "bg-orange-500"}    
            ${status === "At Risk" && "bg-yellow-500"}    
            ${status === "Healthy" && "bg-green-500"}    
        `}>{status}</Badge>
    </>
  )
}

export default PatientStatusBadge
