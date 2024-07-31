interface UserResponse {
  email: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

interface UserAuth {
  access_token: string;
}

export type { UserResponse, UserAuth };
