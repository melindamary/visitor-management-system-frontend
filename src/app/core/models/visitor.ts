export interface Visitor {
    id: number;
    visitor_id: string;
    cardId: string | null;
    name: string;
    phoneNo: string;
    purposeOfVisit: string;
    checkInTime: string | null;  
    checkOutTime: string | null; 
    whomToMeet: string;
    deviceType: string | null;
    serialNumber: string | null;
    image: string | null;
    updated_date: Date | null;
    visit_date: Date | null;
}
