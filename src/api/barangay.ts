import api from "./axios"

export const fetchBarangays = async () => {
    const res = await api.get('/barangays');
    return res.data;
}