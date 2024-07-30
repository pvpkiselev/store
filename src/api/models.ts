interface UserResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

interface UserAuth {
  access_token: string;
}

export type { UserResponse, UserAuth };
