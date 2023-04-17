# File Generator (pdf|excel|word)

## Styling

- pdf, word - with hbs&html templates
- excel - default

## Install & Run

- cd backend
- npm install
- npm start (or nodemon server.js)

## Example

- for pdf
  ```
    post /api/v1/generate/pdf
        body (x-www-form-urlencoded)
            templateName: testReport    // string, from templates/pdf folder [required]
            mark: Jaguar    // any, property in hbs file
            model: F-Type   // any, property in hbs file
            fileName: 'custom' // any || null, if not exist = file_ (default)
        result
            "status": 200,
            "data":
                "fileName": "custom_1681765407065.pdf", // 1681765407065 unix time, like uuid
                "fileUrl": "downloads/custom_1681765407065.pdf"

   and now you can download generated file: get /api/v1/doownloads/custom_1681765407065.pdf
  ```
- for excel
  ```
    post /api/v1/generate/excel
        body (x-www-form-urlencoded)
            fileName: 'custom' // any || null, if not exist = file_ (default)
            excelData:  [["name","code","author","ok"],["Diary","diary_code"],["Note","note_code","Pagorn"]]
            // array of arrays, but stringified like JSON.stringify(array) in javascript
        result
            "status": 200,
            "data":
                "fileName": "file_1681765407065.excel", // 1681765407065 unix time, like uuid
                "fileUrl": "downloads/file_1681765407065.excel"

   and now you can download generated file: get /api/v1/doownloads/file_1681765407065.excel
  ```

#### Cron clean download directory everyday
