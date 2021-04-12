// Bring in express and create application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepos');
let errorHelpers = require('./helpers/errorHelpers');
let cors = require('cors');

// Add express router object
let router = express.Router();
// Configure middleware support for JSON data parsing in request
app.use(express.json());

// configure CORS
app.use(cors());

// Create GET to return all pies
router.get('/', function (req, res, next) {
    pieRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": " All data fetched successfully",
            "data": data
        });
    }, function (err) {
        next(err);
    })

});

router.get('/search', function (req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    pieRepo.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": " All data fetched successfully",
            "data": data
        });
    }, function (err) {
        next(err);
    });
})

// Create GET/id to return a single pie value
router.get('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": " Single pie data data fetched successfully",
                "data": data
            })
        }
        else {
            res.status(404).json({
                "status": 200,
                "statusText": "Not Found",
                "message": "The Pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

router.post('/', function (req, res, next) {
    pieRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Added",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

router.put('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            pieRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "Ok",
                    "message": "Pie '" + req.params.id + "' has been updated.",
                    "data": data
                });
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The Pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
})

// Delete
router.delete('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            pieRepo.delete(req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "Ok",
                    "message": "Pie '" + req.params.id + "' has been deleted.",
                    "data": data
                });
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The Pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
})

// Patching
router.patch('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            pieRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "Ok",
                    "message": "Pie '" + req.params.id + "' has been patched.",
                    "data": data
                });
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The Pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Configure exception logger to console
app.use(errorHelpers.logErrorsToConsole);

// Configure exception logs to file
app.use(errorHelpers.logErrorsToFile);

// Configure client error handler
app.use(errorHelpers.clientErrorHandler);

// Configure catch all middleware last
app.use(errorHelpers.errorHandler);

// Create server to listen to port 5000
let server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000');
});