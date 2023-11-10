const multer = require('multer');
const path = require('path');
const fs = require('fs');

function multerService(videopath) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('src', videopath));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let ex;
            if (file.mimetype === 'video/mp4') {
                ex = 'mp4';
            }
            file.fieldname = uniqueSuffix + '.' + ex;
            cb(null, file.fieldname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });

    return upload;
}

module.exports = multerService;