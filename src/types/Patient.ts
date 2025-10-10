// type Patient = {
//   id?: number;
//   name: string;
//   address: string;
//   belongs_to_ip: string;
//   sex: string;
//   birthday: string;
//   date_measured: string;
//   weight: number;
//   height: number;
//   contact_number: string;
//   age?: number;
//   weight_for_age?: string;
//   height_for_age?: string;
//   weight_for_ltht_status?: string;
  
//   immunizations: string;
//   last_deworming_date: string;
//   allergies: string;
//   medical_history: string;
//   notes: string;

//   status?: string;

//   created_at?: string;
//   updated_at?: string;
// } | null;

// export default Patient;

type Patient = {
  address: string;
  birthday: string;
  contact_number: string;
  created_at: string;
  id: 100
  latest_record?: PatientRecord;
  name: string;
  sex: string;
  updated_at: string;
} | null;

export type PatientRecord = {
  age: number;
  allergies: null | string;
  created_at: string;
  date_measured: string;
  height: number;
  height_for_age: string;
  id: number;
  immunizations: string;
  last_deworming_date: string;
  medical_history: string;
  notes: string;
  patient_id: number;
  status: string;
  updated_at: string;
  weight: number;
  weight_for_age: string;
  weight_for_ltht_status: string;
}

export default Patient;