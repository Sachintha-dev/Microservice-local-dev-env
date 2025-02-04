import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
    mobile: string;
    token: string;        // Refresh token
    accessToken: string;  // Latest valid access token
    expiresAt: Date;      // Expiry for the refresh token
}

const RefreshTokenSchema: Schema = new Schema({
    mobile: { type: String, required: true },
    token: { type: String, required: true },
    accessToken: { type: String, required: true }, // New field
    expiresAt: { type: Date, required: true },
});

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
