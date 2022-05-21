STEPS TO RUN APP LOCALLY

    1. clone the repository

    2. cd to the repository (`cd riktam-tech-assignment`)
    
    3. run `npm install`
    
    4. run `npm start`


STEPS TO EXECUTE TEST CASES

    1. run `npm run test`

API DOCUMENTATION

Note: Please import the `API-PostMan-Collection.json` file into your postman desktop app and you can see the collection with the name `riktam-tech`, you can send the requests to test endpoints.

Sample User Credentials To Login :

    Admin:
        email : admin@gmail.com
        password : admin123

    Normal:
        email : sreehari@gmail.com
        password : sreehari123

Application Flow:
    i. Login with an Admin account
    2. Save the Token
    3. Use token in headers `{'Authorization' : 'Bearer <token>'}`
    4. Perform operations.
