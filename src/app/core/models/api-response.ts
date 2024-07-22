import { VisitorLogDTO } from "./visitor-log-dto";

export interface APIResponse {
    isSuccess: boolean;
    statusCode: number;
    result: {
      activeVisitorsCount: number;
      totalVisitorsCount: number;
      checkedOutVisitorsCount: number;
      upcomingVisitors: VisitorLogDTO[];
      activeVisitors: VisitorLogDTO[];
      visitorsToday: VisitorLogDTO[];
    };
    errorMessages: string[];
  }
  