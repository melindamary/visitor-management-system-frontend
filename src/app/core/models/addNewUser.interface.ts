export interface AddNewUser {
    userName: string;
    password: string;
    validFrom: string; // or Date if you're not transforming it to a string
    officeLocationId: number;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    roleId: number;
    loginUserName:string;
  }