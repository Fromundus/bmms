// import React from 'react'
// import { Badge } from '../ui/badge'

// const PatientStatusBadge = ({ status }: { status: string }) => {
//   return (
//     <>
//         <Badge className={`text-nowrap
//             ${(status === "Severe" || status === "Obese" || status === "Severely Underweight" || status === "Severely Stunted" || status === "Severely Wasted" ) && "bg-red-500"}    
//             ${(status === "Moderate" || status === "Tall" || status === "Mildly Underweight" || status === "Stunted" || status === "Overweight" || status === "Wasted" ) && "bg-orange-500"}    
//             ${(status === "At Risk" || status === "Underweight" )&& "bg-yellow-500"}    
//             ${(status === "Healthy" || status === "Normal" ) && "bg-green-500"}    
//         `}>{status}</Badge>
//     </>
//   )
// }

// export default PatientStatusBadge


import React from 'react'
import { Badge } from '../ui/badge'

const PatientStatusBadge = ({ status }: { status: string }) => {
    const statusClass = {
        // Overall status
        'Severe': 'bg-red-500 hover:bg-red-500 text-white',
        'At Risk': 'bg-yellow-500 hover:bg-yellow-500 text-white',
        'Moderate': 'bg-orange-500 hover:bg-orange-500 text-white',
        'Healthy': 'bg-green-500 hover:bg-green-500 text-white',

        // Under-5 WFA
        'Severe underweight': 'bg-red-500 hover:bg-red-500 text-white',
        'Underweight': 'bg-yellow-500 hover:bg-yellow-500 text-white',

        // Under-5 HFA
        'Severe stunting': 'bg-red-500 hover:bg-red-500 text-white',
        'Stunting': 'bg-orange-500 hover:bg-orange-500 text-white',

        // Under-5 WFL / BFA
        'Severe wasting': 'bg-red-500 hover:bg-red-500 text-white',
        'Wasting': 'bg-orange-500 hover:bg-orange-500 text-white',
        'Overweight': 'bg-orange-500 hover:bg-orange-500 text-white',
        'Obesity': 'bg-red-500 hover:bg-red-500 text-white',

        // 5-19 BFA
        'Severe thinness': 'bg-red-500 hover:bg-red-500 text-white',
        'Thinness': 'bg-orange-500 hover:bg-orange-500 text-white',

        // Normal
        'Normal': 'bg-green-500 hover:bg-green-500 text-white',
    }[status] ?? 'bg-gray-500 hover:bg-gray-500 text-white'

    return (
        <Badge className={`text-nowrap ${statusClass}`}>
            {status ?? ""}
        </Badge>
    )
}

export default PatientStatusBadge
