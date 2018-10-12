'use strict';

let fileSystem = require('fs');

exports.retrieve_a_image = function (req, res) {
    let fileName = req.params.fileName;
    let filePath = "C:\\Users\\Nate\\WebstormProjects\\NateHubble\\static\\images\\" + fileName + ".jpg";
    fileSystem.exists(filePath, function (exists) {
        if (exists) {
            res.writeHead(200, {
                "Content-Type": "image/jpg",
                "Content-Disposition": "attachment; filename=" + fileName + ".jpg"
            });
            fileSystem.createReadStream(filePath).pipe(res);
        }
        else {
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("Error file does not exist");
        }
    });
};