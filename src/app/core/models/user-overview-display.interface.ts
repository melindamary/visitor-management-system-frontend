export interface UserOverview{
    userId:number,
    fullName:string,
    isActive:boolean,
    location:string,
    roleName:string,
    username:string
}

export interface UserByIdOverview{
   
    address:string,
    firstName:string,
    isActive:number,
    lastName:string,    
    officeLocation:string,
    officeLocationId:number,
    phone:string,    
    roleId:number,
    roleName:string,
    userId:number,
    username:string,
    validFrom:string
    
    
}

export interface UserOverviewTransformed {
    userId: number;
    fullName: string;
    status: string;
    location: string;
    roleName: string;
    username: string;
  }