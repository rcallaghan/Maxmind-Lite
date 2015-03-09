# Maxmind-Lite
### A simple Javascript connector to the  Maxmind npm module built on the Express framework...

---

###Install guide:

####Clone repository to your local environment:
```js
git clone https://github.com/rcallaghan/Maxmind-Lite.git
```
####Install  Dependencies:

```js npm install
```

#### Run web service:

```js
node app.js
```

### Example GET requests

The default response is text

```html
http://localhost:8080?token=0FPNEy65JPMxTlW&ip=110.33.122.75
```

Adding the format=json parameter will return a JSON response

```html
http://localhost:8080?token=0FPNEy65JPMxTlW&ip=110.33.122.75&format=json
```
```html
{
    "countryCode": "AU",
    "countryName": "Australia",
    "region": "02",
    "city": "Sydney",
    "postalCode": null,
    "latitude": -33.86150000000001,
    "longitude": 151.20549999999997,
    "dmaCode": 0,
    "areaCode": 0,
    "metroCode": 0,
    "continentCode": "OC",
    "regionName": "New South Wales"
}
```

### What about POST requests?

If a POST request is made to the service it will return a 405 (Bad Request) error with the following response

```html
POST Requests are not accepted on this service.
```

###FAQs

#####Q: Is the database file included the FULL maxmind 
A: No, this is a free version that is downloaded from http://dev.maxmind.com/geoip/legacy/geolite/
