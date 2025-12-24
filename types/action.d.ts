declare global {
  interface SignUpParams {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    language: string;
    nationality: string;
    emergencyContact: string;
    religion?: string;
    password: string;
  }

  interface MyTokenPayload extends jwt.JwtPayload {
    userId: string;
  }

  interface SignInParams {
    email: string;
    password: string;
  }

  interface UpdateUserParams {
    userId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    language: string;
    nationality: string;
    emergencyContact: string;
    religion?: string;
  }
}

export {};
