import multer from'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/profiles')
    },
    filename: (req, file, cb) => {
        const filename = new Date().getTime() + '-' + Math.random().toString(36).substring(2) + '.' + file.originalname.split('.').pop()        
        let error = null
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/))
            error = new Error('Only image files are allowed')
            cb(error, filename)
        cb(error, filename)
    },
})

export default multer({ storage })