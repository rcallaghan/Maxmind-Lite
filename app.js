var express = require('express'),
    app = express(),
    maxmind = require('maxmind');

    var tokens = [
        '0FPNEy65JPMxTlW',
        'NioZyjR0tTth3k3'
    ];

app.get('/', function(req, res) {

    var respond = function(status, message) {
        res.status(status).send(message);
    };

    var chooseIp = function(ipQueryString, ipXforwarded) {
        return ipQueryString || ipXforwarded
    };

    var validIp = function(ip) {
        var ipformat = /((\d{1,3}\.){3}\d{1,3})/;
        return (ip.match(ipformat)) ? true : false;
    };

    var getToken = req.query.token,
        ip,
        ipQueryString = req.query.ip,
        ipXforwarded = req.header('x-forwarded-for'),
        ipTrue = req.ip,
        format = req.query.format;

        if(tokens.indexOf(getToken) < 0) {
            respond(400, "Invalid or missing Token..");
        }

        if(ipXforwarded)
           ipXforwarded = ipXforwarded.split(',').pop();

        ip = chooseIp(ipQueryString, ipXforwarded);

        if(!validIp(ip))
            respond(400, 'IP has not been passed through or cannot be detected.');

        maxmind.init('data/GeoLiteCity.dat', {
            indexCache: true,
            checkForUpdates: true
        });

        var location = maxmind.getLocation(ip);

        if(!location) {
            location = {
                countryCode: ""
            }
        }

        if(format && format.toLowerCase() === 'json') {
            res.json(location);
        } else {
            respond(200,
                location.countryCode + ', '
                + location.countryName + ', ' 
                + location.region + ', '
                + location.city + ', '
                + location.postalCode + ', '
                + location.latitude + ', '
                + location.longitude
            )
        }
}).listen(process.env.PORT || 8080);

app.post('/', function(req, res) {
    res.status(405).send('POST Requests are not accepted on this service.');
});

app.put('/', function(req, res) {
    res.status(405).send('PUT Requests are not accepted on this service.');
});