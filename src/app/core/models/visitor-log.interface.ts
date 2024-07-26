export interface VisitorLogDTO {
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
  