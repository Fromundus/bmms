type Patient = {
  id?: number;
  name: string;
  address: string;
  belongs_to_ip: string;
  sex: string;
  birthday: string;
  date_measured: string;
  weight: number;
  height: number;
  contact_number: string;
  age?: number;
  weight_for_age?: string;
  height_for_age?: string;
  weight_for_ltht_status?: string;
  
  immunizations: string;
  last_deworming_date: string;
  allergies: string;
  medical_history: string;
  notes: string;

  created_at?: string;
} | null;

export default Patient;