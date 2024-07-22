export interface VisitorLogDTO {
  visitorId: number;
  visitorName: string;
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
  