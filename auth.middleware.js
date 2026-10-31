import jwt from "jsonwebtoken"
export const auth = (req, res, next) => {
    let [flag, token] = req.headers.authorization.split(" ")
    console.log(token);
    switch (flag) {
        case "Basic":
            const basicData = Buffer.from(token, "base64").toString()
            console.log(basicData);

            let [email, password] = basicData.split(":")
            console.log({ email, password });

            break;
        case "Bearer":
            let decoded = jwt.decode(token);
            let signature;
            switch (decoded.aud) {
                case "admin":
                    signature = env.AdminSignature;
                    break;
                case "user":
                    signature = env.userSignature;
                    break;
                default:
                    break;
            }
            let decodedData = jwt.verify(token, signature);
            console.log(decodedData);
            if (decodedData) {
                req.user = decodedData;
                next();
            } else {
                throw BadRequestException({ message: "invalid token" }); 
            }
    }
}