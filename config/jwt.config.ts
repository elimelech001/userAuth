import { JwtModuleOptions } from '@nestjs/jwt';


export const jwtConfig: JwtModuleOptions = {
    secret: process.env.APP_SECRET,
    signOptions: { expiresIn: '1d' },
};


