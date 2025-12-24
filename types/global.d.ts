declare global {
  interface User {
    id: string;
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

  interface ActionResponse<T = null> {
    success: boolean;
    data?: T;
    error?: {
      message?: string;
      details?: Record<string, string[]>;
    };
    status?: number;
  }

  type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
  type ErrorResponse = ActionResponse<undefined> & { success: false };

  type APIErrorReponse = NextResponse<ErrorResponse>;
  type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

  interface PaginatedSearchParams {
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
    sort?: string;
  }
}

export {}
