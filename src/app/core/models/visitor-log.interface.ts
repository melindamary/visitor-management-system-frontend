export interface Device {
  id: number;
  name: string;
  serialNumber: string;
}
export interface DeviceList {
  $id: string;
  $values: Device[];
}

export interface VisitorLog {
  id: number;
  name: string;
  phone: string;
  purposeName: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  visitorPassCode: string;
  visitDate: string | null;
  deviceName: string | null; // Consider removing if not used
  serialNumber: string | null; // Consider removing if not used
  hostName: string | null;
  photoBase64: string | null;
  devices: DeviceList; // Updated to reflect the nested structure
}

export interface VisitorList {
  $id: string;
  $values: VisitorLog[];
}

export interface VisitorLogResult {
  activeVisitorsCount: number;
  totalVisitorsCount: number;
  checkedOutVisitorsCount: number;
  upcomingVisitors: VisitorList;
  activeVisitors: VisitorList;
  visitorsToday: VisitorList;
  checkedOutVisitors: VisitorList;
  scheduledVisitors: VisitorList;
}

export interface VisitorLogResponse {
  isSuccess: boolean;
  result: VisitorLogResult;
  statusCode: number;
  errorMessages: string[];
}
