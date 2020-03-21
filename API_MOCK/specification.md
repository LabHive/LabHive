# Specification


## Registrierung

### Request (Human)
POST https://labshare.de/registration?type=human
```json
{
    "address": {
        "city": "", // ^[A-Za-z -]+$
        "zipcode": "58455", // ^[0-9]{5}$
    },
    "firstname": "", // ^[A-Za-z -.]+$
    "lastname": "",  // ^[A-Za-z -.]+$
    "contact": {
        "email": "",     // ^[A-Za-z.]+$
        "telephone": "", // ^[0-9+]+$
    },
    "description": "",
    "details": {
       "question1": "",
       "question2": true,
       "question3": 20,
    },
    "available": true,
    "password": ""
}
```

### Response
```json
{
    "success": true
}
```

```json
{
    "success": false,
    "errorDescription": ""
}
```


### Request (Lab)
POST https://labshare.de/registration?type=lab

Unique Identifier (kein Labor kann sich 2x registrieren):
* address
* name

```json
{
    "location": {
        "type": "Point",
        "coordinates": [10.111, 10.2234] // longitude, latitude
    },
    "address": {
        "city": "", // ^[A-Za-z -]+$
        "zipcode": "58455", // ^[0-9]{5}$
        "street": "" // ^[A-Za-z -.0-9]+$, nur für Labore!! (Datensparsamkeit)
    },
    "labContact": {
        "firstname": "",
        "lastname": "",
        "email": "",
        "phone": ""
    },
    "name": "Laborname",
    "description": "",
    "password": ""
}
```

### Response
```json
{
    "success": true
}
```

```json
{
    "success": false,
    "errorDescription": ""
}
```





## Passwort vergessen
### Request
POST https://labshare.de/password-forgotten

Verschickt eine Mail mit Link auf Passwort neu setzen

```json
{
    "email": ""
}
```

### Request
POST https://labshare.de/password-reset?token="token"

```json
{
    "password": ""
}
```




## User management
GET https://labshare.de/profile
POST https://labshare.de/profile
DELETE https://labshare.de/profile

Liefert folgende Infos in gleicher Struktur wie bei der Registrierung, die editiert werden können:
* Person:
    * Location
    * Description
    * Contact
    * Available
* Lab:
    * Location
    * LabContact
    * Name
    * Description

### POST Request
Gleiche Struktur wie bei Registrierung

### DELETE Request
Kein Body, Standard Response





## Login
POST https://labshare.de/login

```json
{
    "email": "",
    "password": ""
}

```

### Response
```json
{
    "success": true
}
```

```json
{
    "success": false,
    "errorDescription": ""
}
```




## Search
GET https://labshare.de/search?type="human|lab"&search_type="equipment|human_ressources"&filter1=""&filter2=true&filter3=21&page=2

### Get Parameter
* `type`
    * Required: True
    * `human|lab`
* `search_type`
    * 
    * "

* filter und page sind optional
* Menschen können nach Labore und nach Equipment suchen
* Labore können:
    * Equipment suchen
    * Menschen suchen

### Response
Liefert folgende Infos in gleicher Struktur wie bei der Registrierung, die editiert werden können:
* Person:
    * Location
    * Description
    * Contact
    * Available

```json
{
    "_embedded": [
        {
            "data": {
                "location": {
                    "type": "Point",
                    "coordinates": [10.111, 10.2234] // longitude, latitude
                },
                "address": {
                    "city": "", // ^[A-Za-z -]+$
                    "zipcode": "58455", // ^[0-9]{5}$
                    "street": "" // ^[A-Za-z -.0-9]+$, nur bei Laboren vorhanden
                },
                "labContact": {
                    "firstname": "",
                    "lastname": "",
                    "email": "",
                    "phone": ""
                },
                "name": "Laborname",
                "description": "",
            },
            "distance": "12km",
            
        }
    ],
    "_links": {
        "next": "https://labshare.de/search?filter1=""&filter2=true&filter3=21&page=3"
    }
}

```





## Session Token JWT
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.` (HEADER)  
`eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.` (Payload)  
`SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` (HMAC über den Payload)

### Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload: 
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

