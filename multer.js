import multer from 'multer'

export const upload = () => {
    const storage = multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })

    return multer({ storage })
}

Limits:{
    fileSize:2*1024*1024
}

const fileFilter = (req, file, cb) => {
        const allowedType = ['image/png']
        if (!allowedType.includes(file.mimetype)) {
            console.log('true');

            cb(new Error("invalid format"))
            return
        } else {
            console.log('false');

            cb(null, true)
        }
    }

    return multer({ storage, fileFilter })
