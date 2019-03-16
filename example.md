Request:

http://cm-crawler.obss.com.tr/v1/url-analyze?url=http://cm-testsite.obss.com.tr/ 

Response:

{

    "url": "http://cm-testsite.obss.com.tr/",

    "analysisDuration": 4950,

    "redirectedURLs": [],

    "responseCode": 200,

    "responseMessage": "OK",

    "internalLinks": [

        {

            "parsedUrl": "http://cm-testsite.obss.com.tr/obss",

            "finalUrl": "http://cm-testsite.obss.com.tr/obssInfo",

            "secured": false,

            "reachable": true,

            "redirectedURLs": [

                "http://cm-testsite.obss.com.tr/obssInfo"

            ],

            "totalAccessDuration": 8,

            "contentLength": 10,

            "responseCode": 200,

            "responseMessage": "OK"

        },

        {

            "parsedUrl": "http://cm-testsite.obss.com.tr/help",

            "finalUrl": "http://cm-testsite.obss.com.tr/help",

            "secured": false,

            "reachable": false,

            "totalAccessDuration": 5,

            "responseCode": 404,

            "responseMessage": "Not Found"

        },

        {

            "parsedUrl": "http://cm-testsite.obss.com.tr/about",

            "finalUrl": "http://cm-testsite.obss.com.tr/about",

            "secured": false,

            "reachable": false,

            "totalAccessDuration": 3003,

            "responseCode": 408,

            "responseMessage": "Request Timeout"

        },

        {

            "parsedUrl": "http://cm-testsite.obss.com.tr/post/a-codemaster-codemaster-codemaster-codemaster",

            "finalUrl": "http://cm-testsite.obss.com.tr/post/a-codemaster",

            "secured": false,

            "reachable": false,

            "redirectedURLs": [

                "http://cm-testsite.obss.com.tr/post/a-codemaster-codemaster-codemaster",

                "http://cm-testsite.obss.com.tr/post/a-codemaster-codemaster",

                "http://cm-testsite.obss.com.tr/post/a-codemaster"

            ],

            "totalAccessDuration": 6,

            "responseCode": 310,

            "responseMessage": "Too Many Redirects"

        },

        {

            "parsedUrl": "http://cm-testsite.obss.com.tr/contact-us",

            "finalUrl": "http://cm-testsite.obss.com.tr/contact-us",

            "secured": false,

            "reachable": false,

            "totalAccessDuration": 6,

            "responseCode": 404,

            "responseMessage": "Not Found"

        }

    ],

    "externalLinks": [

        {

            "parsedUrl": "https://www.google.com",

            "finalUrl": "https://www.google.com",

            "secured": true,

            "reachable": true,

            "totalAccessDuration": 423,

            "responseCode": 200,

            "responseMessage": "OK"

        },

        {

            "parsedUrl": "http://cm-testsite.obss.com.tr/post/a-codemaster",

            "finalUrl": "https://www.google.com/?gws_rd=ssl",

            "secured": true,

            "reachable": true,

            "redirectedURLs": [

                "http://cm-testsite.obss.com.tr/post/a",

                "http://www.google.com",

                "https://www.google.com/?gws_rd=ssl"

            ],

            "totalAccessDuration": 392,

            "responseCode": 200,

            "responseMessage": "OK"

        },

        {

            "parsedUrl": "https://adkakdasd.adasdsad.com",

            "finalUrl": "https://adkakdasd.adasdsad.com",

            "secured": false,

            "reachable": false,

            "totalAccessDuration": 627,

            "responseCode": 503,

            "responseMessage": "Service Unavailable"

        },

        {

            "parsedUrl": "mailto:olcay.orakci@gmail.com",

            "secured": false,

            "reachable": false,

            "responseCode": 400,

            "responseMessage": "Bad Request"

        }

    ]

}