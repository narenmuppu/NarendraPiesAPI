let logRepo = require('../repos/logRepos');

let errorHelpers = {
    logErrorsToConsole: function (err, req, res, next){
        console.error("Log Entry: " + JSON.stringify(errorHelpers.errorBuilder(err)));
        console.error("*".repeat(80));
        next(err);
    },
    logErrorsToFile: function (err, req, res, next){
        let errorObject = errorHelpers.errorBuilder(err);
        errorObject.requestInfo = {
            "hostname": req.hostname,
            "path": req.path,
            "app": req.app
        }
        logRepo.write(errorObject, function (data){
            console.log(data);
        }, function (err){
            console.error(err);
        });
        next(err);
    },
    clientErrorHandler: function (err, res, req, next) {
        if (req.xhr) {
            res.status(500).json({
                "status": 500,
                "statusText": "Internal Server Error",
                "message": "XMLHttpRequest Error",
                "error": {
                    "errno": 0,
                    "call": "XMLHttpRequest Call",
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": err.message
                }
            });
        } else{
            next(err);
        }
    },
    errorHandler: function(err, req, res, next){
        res.status(500).json(errorHelpers.errorBuilder(err));
    },
    errorBuilder: function(err){
        return {
            "status": 500,
            "statusText": "Internal Server Error",
            "message": err.message,
            "error": {
                "errno": err.errno,
                "call": err.syscall,
                "code": "INTERNAL_SERVER_ERROR",
                "message": err.message
            }
        }
    }
}

module.exports = errorHelpers;