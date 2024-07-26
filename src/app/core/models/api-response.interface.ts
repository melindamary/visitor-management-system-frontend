import { VisitorLogDTO } from "./visitor-log.interface";

export interface APIResponse {
  isSuccess: boolean;
  statusCode: number;
  result: {
    activeVisitorsCount: number;
    totalVisitorsCount: number;
    checkedOutVisitorsCount: number;
    upcomingVisitors: VisitorLogDTO[];
    activeVisitors: VisitorLogDTO[];
    checkedOutVisitors: VisitorLogDTO[];
    visitorsToday: VisitorLogDTO[];
  };
  errorMessages: string[];
}
  