const libraryModel = require('../models/Library.model');
const {
    addLibraryData,
    getLibraries,
    removeLibrary
} = require('./courses.service');

//Admin

exports.add = async (cid, title, url, desc) => {
    const Data = new libraryModel({
        title: title,
        urlLink: url,
        linkDescription: desc
    });
    const check = await Data.save();
    // console.log(check);
    const cour = await addLibraryData(cid, check._id);
    if (cour) {
        return check;
    } else {
        return false;
    }
};

exports.showAll = async () => {
    const data = await libraryModel.find();
    return data;
}

exports.showlibraryDetails = async (id) => {
    // console.log(id);
    const result = await libraryModel.findById(id);
    return result;
};

exports.getLibraryforCourse = async (cid) => {
    const courseLib = await getLibraries(cid);

    let y;
    const Arr = [];
    for (i = 0; i < courseLib.length; i++) {
        y = await getlib(courseLib[i]);
        if (y !== null) {
            const ob = {
                title: y.title,
                id: y._id,
                url: y.urlLink,
                desc: y.linkDescription
            };
            Arr.push(ob);
        }
    }
    return Arr;
};

async function getlib(id) {
    return await libraryModel.findById(id);
}

exports.editLibrary = async (lid, title, url, desc) => {
    const data = await libraryModel.findById(lid);
    data.title = title;
    data.urlLink = url;
    data.linkDescription = desc;
    return await data.save();
};

exports.deleteLibrary = async (lid) => {
    const remLib = await removeLibrary(lid);
    const Data = await libraryModel.findByIdAndDelete(lid);
    if (remLib || Data) {
        return Data;
    } else {
        return false;
    }
};