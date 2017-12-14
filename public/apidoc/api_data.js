define({ "api": [
  {
    "type": "get",
    "url": "/anuncios",
    "title": "Listar anuncios",
    "description": "<p>Permite realizar una búsqueda filtrada y paginada de los anuncios disponibles. Es necesario que el usuario esté autorizado en la api para mostrar los resultados.</p>",
    "name": "GetAnuncios",
    "group": "Anuncio",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Accept-Language",
            "description": "<p>Idioma del usuario [es,en]. Default es</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Accept-Language:",
          "content": "{\n  \"Accept-Language\": \"en\"\n}",
          "type": "json"
        },
        {
          "title": "x-access-token:",
          "content": "{\n  \"x-access-token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo",
            "description": "<p>Buscar por tipo de anuncio: venta o busqueda</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>Buscar por tag: work, lifestyle, motor y mobile - Pueden enviarse varios separados por espacio</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "min",
            "description": "<p>Precio mínimo del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "max",
            "description": "<p>Precio máximo del anuncio</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre que empiece por el dato buscado</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limitar el número de anuncios devueltos</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Saltar anuncios</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Si la llamada fue correcta</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "result",
            "description": "<p>Array con los anuncios disponibles</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n     success: true,\n     result: [\n         {\n             _id: \"5a2eb933a92cc8a634efb070\",\n             nombre: \"iPhone 3GS\",\n             venta: false,\n             precio: 50,\n             foto: \"images/anuncios/iphone.png\",\n             tags: [\n                 \"lifestyle\",\n                 \"mobile\"\n             ]\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Parámetros no válidos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\n{\n    success: false,\n    code: \"InvalidParameters\",\n    errors: {\n        message: \"Parámetros no válidos\",\n        errors: {\n            tipo: {\n            location: \"query\",\n            param: \"tipo\",\n            value: \"cosa\",\n            msg: \"Tipo puede ser venta o busqueda\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apiv1/anuncios.js",
    "groupTitle": "Anuncio"
  },
  {
    "type": "get",
    "url": "/anuncios/tags",
    "title": "Listar tags",
    "description": "<p>Permite recuperar los tags de los diferentes anuncios que existen Es necesario que el usuario esté autorizado para ver éste recurso</p>",
    "name": "GetTags",
    "group": "Anuncio",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Accept-Language",
            "description": "<p>Idioma del usuario [es,en]. Default es</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Accept-Language:",
          "content": "{\n  \"Accept-Language\": \"en\"\n}",
          "type": "json"
        },
        {
          "title": "x-access-token:",
          "content": "{\n  \"x-access-token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Si la llamada fue correcta</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "result",
            "description": "<p>Array con los tags disponibles</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    success: true,\n    result: [\n        \"lifestyle\",\n        \"motor\",\n        \"mobile\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apiv1/anuncios.js",
    "groupTitle": "Anuncio"
  },
  {
    "type": "post",
    "url": "/authenticate",
    "title": "Login",
    "description": "<p>Autoriza a un usuario y devuelve su JSONWebToken</p>",
    "version": "1.0.0",
    "name": "Authenticate",
    "group": "Authenticate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>El email del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "clave",
            "description": "<p>La password del usuario</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Accept-Language",
            "description": "<p>Idioma del usuario [es,en]. Default es</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Accept-Language:",
          "content": "{\n  \"Accept-Language\": \"en\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Si la llamada fue correcta</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Token jwt que deberá usarse en todas las llamadas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEyZWI5MzNhOTJjYzhhNjM0ZWZiMDcyIiwiaWF0IjoxNTEzMTYxOTM1LCJleHAiOjE1MTMzMzQ3MzV9.1nL547iBVB9sAFeQdG5hUPWTpvgX1ghdNGuLzocEajc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Los parámetros no son correctos</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>No existe ningún usuario registrado con ese email</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>El password es incorrecto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\n{\n    \"success\": false,\n    \"code\": \"InvalidParameters\",\n    \"errors\": {\n        \"message\": \"Parámetros no válidos\",\n        \"errors\": {\n            \"email\": {\n                \"location\": \"body\",\n                \"param\": \"email\",\n                \"msg\": \"El email debe ser válido\"\n           }\n        }\n    }\n}",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 401 Not Found",
          "content": "HTTP/1.1 401 Not Found\n{\n    \"success\": false,\n    \"code\": \"InvalidEmail\",\n    \"errors\": \"No existe ningún usuario registrado con ese email\"\n}",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 401 Not Found",
          "content": "HTTP/1.1 401 Not Found\n{\n    \"success\": false,\n    \"code\": \"InvalidPassword\",\n    \"errors\": \"El password es incorrecto\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apiv1/authenticate.js",
    "groupTitle": "Authenticate"
  },
  {
    "type": "post",
    "url": "/usuarios",
    "title": "Registrar usuario",
    "description": "<p>Registra un nuevo usuario y devuelve el nuevo usuario creado</p>",
    "name": "CreateUser",
    "group": "Usuario",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>El nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>El email del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clave",
            "description": "<p>La contraseña del usuario</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Accept-Language",
            "description": "<p>Idioma del usuario [es,en]. Default es</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Accept-Language:",
          "content": "{\n  \"Accept-Language\": \"en\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success-",
            "description": "<p>si el usuario se ha creado</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "result-",
            "description": "<p>el nuevo usuario creado</p> <p>{ &quot;success&quot;: true, &quot;result&quot;: { &quot;nombre&quot;: &quot;Test&quot;, &quot;email&quot;: &quot;test<code>@</code>example.com&quot;, &quot;_id&quot;: &quot;5a310feb99e91e8c189d63a0&quot; } }</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Los parámetros no son correctos</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicatedEmail",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\n{\n    \"success\": false,\n    \"code\": \"InvalidParameters\",\n    \"errors\": {\n        \"message\": \"Parámetros no válidos\",\n        \"errors\": {\n            \"email\": {\n                \"location\": \"body\",\n                \"param\": \"email\",\n                \"msg\": \"El email debe ser válido\"\n           }\n        }\n    }\n}",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 409 Conflict",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"success\": false,\n    \"code\": \"DuplicatedEmail\",\n    \"errors\": \"The email is already registered with another user\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apiv1/usuarios.js",
    "groupTitle": "Usuario"
  }
] });
