export const columns:any = [
  { field: 'name', header: 'Name', width: '20%' },
  { field: 'phoneNumber', header: 'Phone Number', width: '8%' },
  { field: 'visitDate', header: 'Visit Date', width: '12%' },
  { field: 'officeLocation', header: 'Office Location', width: '12%' },
  { field: 'visitPurpose', header: 'Visit Purpose', width: '10%' },
  { field: 'hostName', header: 'Host Name', width: '11%' },
  { field: 'onDutyStaff', header: 'On-duty Staff', width: '10%' },
  { field: 'staffContactNumber', header: 'Staff Contact', width: '10%' },
  { field: 'checkIn', header: 'Check-In', width: '8%' },
  { field: 'checkOut', header: 'Check-Out', width: '14%' },
];

export const customHeaders: { [key: string]: string } = {
  slNo: 'Sl. No.',
  name: 'Name',
  phoneNumber: 'Phone Number',
  visitDate: 'Visit Date',
  officeLocation: 'Office Location',
  visitPurpose: 'Visit Purpose',
  hostName: 'Host Name',
  onDutyStaff: 'On-duty Staff',
  staffContactNumber: 'Staff Contact',
  checkIn: 'Check-In',
  checkOut: 'Check-Out',
  deviceCount: 'Number of Devices Carried',
  devices: 'Device (Serial Number)',
  // Add more field mappings as needed
};
