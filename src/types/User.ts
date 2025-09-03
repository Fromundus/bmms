type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  status: string;
  created_at?: string;

  profile_picture: string;
} | null;

export default User;