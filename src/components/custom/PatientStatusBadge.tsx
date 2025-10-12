import React from 'react'
import { Badge } from '../ui/badge'

const PatientStatusBadge = ({ status }: { status: string }) => {
  return (
    <>
        <Badge className={`text-nowrap
            ${(status === "Severe" || status === "Obese" || status === "Severely Underweight" || status === "Severely Stunted" || status === "Severely Wasted" ) && "bg-red-500"}    
            ${(status === "Moderate" || status === "Tall" || status === "Mildly Underweight" || status === "Stunted" || status === "Overweight" || status === "Wasted" ) && "bg-orange-500"}    
            ${(status === "At Risk" || status === "Underweight" )&& "bg-yellow-500"}    
            ${(status === "Healthy" || status === "Normal" ) && "bg-green-500"}    
        `}>{status}</Badge>
    </>
  )
}

export default PatientStatusBadge
