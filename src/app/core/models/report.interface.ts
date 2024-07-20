export interface Report {
  slNo: number;
  name: string;
  phoneNumber: string;
  visitDate: string;
  officeLocation: string;
  visitPurpose: string;
  hostName: string;
  checkIn: string;
  checkOut: string;
  [key: string]: any; // Add this line to allow indexing with a string key
}

export interface Column {
  field: string;
  header: string;
  width: string;
}
