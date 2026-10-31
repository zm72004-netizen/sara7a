import jwt from "jsonwebtoken"


export const auth = (req, res, next) => {
    console.log(req.headers.token);
    let decodedData = jwt.verify(req.headers.token, "route")
    console.log(decodedData);
    req.user = decodedData
    next()
}
export const generateAccessToken = (refreshToken) => {
    let data = jwt.decode(refreshToken)
    let signature;
    let refreshsignature
    let aud;
    switch (data.aud) {
        case "admin":
            signature = env.AdminSignature
            aud = "admin"
            refreshsignature = env.AdminRefreshSignature
            break;

        default:
            signature = env.userSignature
            aud = "user"
            refreshsignature = env.userRefreshSignature
            break;
    }
    let decodedRefreshToken = jwt.verify(refreshToken, refreshSignature)
    // let accessToken = jwt.sign({ id: user._id }, signature , {expiresIn:"30min" , audience:aud})
    // let refreshToken = jwt.sign({ id: user._id }, refreshsignature , {expiresIn:"1y" , audience:aud})
    // return {accessToken , refreshToken}

}