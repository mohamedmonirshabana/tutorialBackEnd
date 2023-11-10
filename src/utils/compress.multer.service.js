const multer = require('multer');
const path = require('path');
const fs = require('fs');

function multerService(compressPath) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('src', compressPath));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let ex;
            if (file.mimetype === 'application/zip') {
                ex = "zip";
            }
            file.fieldname = uniqueSuffix + '.' + ex;
            cb(null, file.fieldname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'application/zip') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    const upload = multer({
        storage: storage,
        limits: {
            fieldSize: 1024 * 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });
    return upload;
}

module.exports = multerService;