import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private databaseService;
    constructor(configService: ConfigService, databaseService: DatabaseService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
    }>;
}
export {};
