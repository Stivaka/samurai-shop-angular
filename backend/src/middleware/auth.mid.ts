import { verify } from "jsonwebtoken";

export default (req:any, res:any, next:any) => {

    const token = req.headers.token as string; 
    
    
    if (!token) return res.status(401).send();

    try {
        const decoded = verify(token, "lkasdlkjlkrkceoj");
        req.user = decoded;

    } catch (error) {
        res.status(401).send();
    }

    return next();
}