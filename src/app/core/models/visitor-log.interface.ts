export interface VisitorLog {
    id: number;
    name: string;
    phone: string;
    purposeName: string;
    checkInTime: string | null;
    checkOutTime: string | null;
    visitorPassCode: string;
    visitDate: Date | null;
    deviceName: string | null;
    hostName: string | null;
    photoBase64: string | null;
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
  }
  
  export interface VisitorLogResponse {
    isSuccess: boolean;
    result: VisitorLogResult;
    statusCode: number;
    errorMessages: string[];
  }
  
  