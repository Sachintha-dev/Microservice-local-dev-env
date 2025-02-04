import * as crypto from 'crypto';

const hashMobileNumber = (mobileNumber: string) => {
    const salt = process.env.SALT; // Use a consistent secret salt
    return crypto.createHash('sha256').update(mobileNumber + salt).digest('hex');
};

export default hashMobileNumber;