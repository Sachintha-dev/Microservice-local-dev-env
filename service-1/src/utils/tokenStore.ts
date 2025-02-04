import RefreshToken, { IRefreshToken } from '../models/refreshToken';

// Save refresh token in MongoDB
export const saveRefreshToken = async (mobile: string, token: string, expiresAt: Date): Promise<IRefreshToken> => {
    const refreshToken = new RefreshToken({ mobile, token, expiresAt });
    return await refreshToken.save();
};

// Validate a refresh token
export const validateRefreshToken = async (token: string): Promise<IRefreshToken | null> => {
    return await RefreshToken.findOne({ token, expiresAt: { $gt: new Date() } });
};

// Delete a refresh token
export const deleteRefreshToken = async (token: string): Promise<void> => {
    await RefreshToken.deleteOne({ token });
};

// Save access and refresh tokens in the database
export const saveTokens = async (
    mobile: string,
    refreshToken: string,
    accessToken: string,
    expiresAt: Date
): Promise<IRefreshToken> => {
    const tokenRecord = new RefreshToken({
        mobile,
        token: refreshToken,
        accessToken, // Save the latest access token
        expiresAt,
    });
    return await tokenRecord.save();
};

// Validate access token from the database
export const validateAccessToken = async (mobile: string, token: string): Promise<boolean> => {
    const tokenRecord = await RefreshToken.findOne({ mobile, accessToken: token });
    return !!tokenRecord; // Return true if the token exists and matches
};