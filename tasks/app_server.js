(function() {
    var connect, eventstream, http, livereload, livereloadChanged, open, proxy, server, tinylr, url, util;

    util = require("gulp-util");
    open = require('open');
    http = require('http');
    url = require('url');
    connect = require('connect');
    eventstream = require("event-stream");
    tinylr = require("tiny-lr")();
    livereload = require('connect-livereload');
    proxy = require('proxy-middleware');

    server = function() {
        var api, app, colors, log;
        log = util.log;
        colors = util.colors;
        tinylr.listen(35729);
        api = url.parse('http://localhost:6001/_api');
        app = connect().use(livereload({
            port: 35729
        })).use(connect.logger("dev")).use(connect.static('app')).use('/_api', proxy(api));
        server = http.createServer(app).listen(9000);
        return server.on("listening", function() {
            var serverAddress;
            serverAddress = server.address();
            // localhost broke some stuff
            url = "http://localhost" + ":" + serverAddress.port;
            return open(url);
        });
    };

    livereloadChanged = function() {
        return eventstream.map(function(file, callback) {
            tinylr.changed({
                body: {
                    files: file.path
                }
            });
            return callback(null, file);
        });
    };

    module.exports = {
        run: server,
        reload: livereloadChanged
    };

}).call(this);
