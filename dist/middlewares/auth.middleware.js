import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_kunci_rahasia';
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
    }
    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ success: false, message: 'Format token salah' });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; // Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Token tidak valid' });
    }
};
//# sourceMappingURL=auth.middleware.js.map