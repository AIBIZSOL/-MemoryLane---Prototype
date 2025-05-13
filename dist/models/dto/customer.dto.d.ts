declare class YearsAttendedDto {
    start?: string;
    end?: string;
}
declare class SchoolInfoDto {
    name?: string;
    location?: string;
    yearsAttended?: YearsAttendedDto;
    description?: string;
}
export declare class UpdateCustomerDto {
    name?: string;
    schoolInfo?: SchoolInfoDto;
}
export {};
