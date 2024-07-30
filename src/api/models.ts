interface CreateUserResponse {
  data: {
    email: string;
    password: string;
    name: string;
    avatar: string;
    role: string;
    id: number;
  };
  status: number;
}

interface UserAuth {
  data: {
    access_token: string;
  };
  status: number;
}

export type { CreateUserResponse, UserAuth };
