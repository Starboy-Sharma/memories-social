const errorMessages = require('./errorResponse');
const responseMessages = require('./successResponse');


exports.sendError = (error, res, code)  => {
    console.log("exports.sendError -> error", error);

    let response = {
        "success": false,
        "errorCode": error.errorCode,
        "message": errorMessages[error.errorCode],
        "result": {
            error: error.error
        },
        "time": Date.now()
    }

    if (response.errorCode == 'validationError') {
        response.message = response.result.error;
    }

    res.status(code).json(response);
}


exports.sendSuccess = (result, res, code) => {
    let response = {
        "success": true,
        "successCode": result.successCode,
        "message": responseMessages[result.successCode],
        "data": result,
        "time": Date.now()
    }
    res.status(code).json(response);
}


