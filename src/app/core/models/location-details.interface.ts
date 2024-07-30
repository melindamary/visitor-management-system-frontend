export interface LocationDetails {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdDate: string;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    result: T;
    statusCode: number;
    errorMessages: any;
  }
  
  export interface UpdateLocation {
    name: string;
    address: string;
    phone: string;
  }