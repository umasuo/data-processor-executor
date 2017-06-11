'use strict';

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var vm = require("vm");

/**
* processorId is the processor file id.
**/
app.post('/data-processors/:processorId', function(req, res) {

    var processorId = req.params.processorId

    console.log(processorId);
    //TODO read the cache to see if the processor script is in cache.
    //TODO read the processor script file from the file system.
    var script = "output = input";

    //prepare the data.
    var data = {};
    data.input = req.body;
    data.output = {};

    //run the script
    vm.runInNewContext(script, data);

    console.log(data.input);
    console.log(data.output);

    res.send(data.output);
});

app.listen(3000, function () {
  console.log('The Data processor is running on port: 3000!')
})
