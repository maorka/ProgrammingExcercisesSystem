let UserLogic = require('./BL/userLogic'),
    generalLogic = require('./BL/generalLogic'),
    LanguageLogic = require('./BL/LanguageLogic'),
    ExerciseLogic = require('./BL/ExerciseLogic'),
    checkAuth = require('./Middlewares/checkAuth')
   
    module.exports = app => {

    //read users(for test)
    app.get('/user', async (req, res) => {
        let result
        try {
            result = await UserLogic.read()
            console.log('\x1b[34m', "all user get request from client", '\x1b[0m')
        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to get users data failed ", '\x1b[0m')

        }
        res.send(result)
    })



    //register
    app.post('/register', async (req, res) => {
        try {
            await UserLogic.register(req.body)
            res.status(200).json({
                message: 'User created'
            });
            console.log('\x1b[34m', "register user (post)  from client succeed", '\x1b[0m')
        } catch (error) {
            res.status(400).json({
                message: error.message || error
            });
            console.log('\x1b[31m', "register user (post) from client failed ", '\x1b[0m')

        }

    })

    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        try {
            //console.log(req.headers);
            let result = await UserLogic.login(email, password)
            res.status(200).json({
                message: 'User connected & Auth successful',
                token: result
            });
            console.log('\x1b[34m', "Login user (post)  from client succeed", '\x1b[0m')

        } catch (error) {
            res.status(401).json({      //401=Unauthorized
                message: error.message || error
            });
            console.log('\x1b[31m', "Login user (post) from client failed: " + error, '\x1b[0m')
        }
    })




    //CRUD-single Exercises

    //create-single Exercise
    app.post('/exercise', async (req, res) => {
        let result
        try {
            //console.log(req.headers);
            await ExerciseLogic.create(req.body)
            res.status(200).json({
                message: 'Exercise created successfully'
            });
            console.log('\x1b[34m', "Exercise creation (post)  from client succeed", '\x1b[0m')

        }
        catch (error) {
            res.status(400).json({      //401=Unauthorized
                message: error.message || error
            });

            console.log('\x1b[31m', "create Exercise (post) request from client failed ", '\x1b[0m')
        }


    })


    //read-single Exercise
    app.get('/exercise/:id?', async (req, res) => {

        let result;
        try {
            if (req.params.id) {
                result = await generalLogic.
                    getExcrise(req.params.id)
                console.log('\x1b[34m', "find specific Exercise by id get request from client succeed", '\x1b[0m')
            }
            else {
                result = await ExerciseLogic.read()
            }
        }
        catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "find specific Exercise by id get request by client failed ", '\x1b[0m')

        }
        res.send(result)
    })

    app.put('/exercise/:id', async (req, res) => {
        let { id } = req.params,
            result
        try {
            result = await ExerciseLogic.update(id, req.body)
            console.log('\x1b[34m', "Update Exercise succeeds ", '\x1b[0m')
        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to update exercise failed ", '\x1b[0m')
        }
        res.send(result)
    })

    app.delete('/exercise/delete/:id', async (req, res) => {
        let { id } = req.params,
            result
        try {
            await ExerciseLogic.deleteExer(id)
            res.status(200).json({
                message: 'Exercise Deleted successfully'
            });
            console.log('\x1b[34m', "Delete Exercise succeeds ", '\x1b[0m')

        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to delete exercise failed ", '\x1b[0m')
        }
        res.send(result)
    })

    app.delete('/deleteAll', async (req, res) => {

        try {
            result = await ExerciseLogic.delAllExercises()
            res.status(202);
            console.log('\x1b[34m', "Delete All Exercise succeeds ", '\x1b[0m')

        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to delete All exercise failed ", '\x1b[0m')
        }
        res.send(result)
    })





    //read-Exercises(all of them)

    app.get('/exerciseAll', async (req, res) => {
        let result
        try {
            result = await ExerciseLogic.read()
            console.log('\x1b[34m', "get All Exercise succeeds ", '\x1b[0m')

        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to get All exercise failed ", '\x1b[0m')

        }
        res.send(result)
    })



    //read-language

    app.get('/language/:id?',checkAuth, async (req, res) => {
        let result;
        try {
            result = await LanguageLogic.read(req.params.id)
            console.log('\x1b[34m', "read (get) Programming language fron client succeeds ", '\x1b[0m')//\x1b[34m=blue

        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to get Programming language failed ", '\x1b[0m')//\x1b[31m=red

        }
        res.send(result)
    })
    app.get('/AllLanguages', async (req, res) => {
        let result;
        try {
            result = await LanguageLogic.read(req.params.id)
            console.log('\x1b[34m', "read (get) Programming language fron client succeeds ", '\x1b[0m')//\x1b[34m=blue

        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "try from client to get Programming language failed ", '\x1b[0m')//\x1b[31m=red

        }
        res.send(result)
    })




    //read- Exercises per language
    app.get('/excrciseByLanguage/:id', async (req, res) => {

        let result;
        try {
            if (req.params.id) {
                result = await generalLogic.getExcriseById(req.params.id)
                console.log('\x1b[34m', "find specific Exercise by programing languge get request from client succeed", '\x1b[0m')
            }
            else {
                result = await ExerciseLogic.readExcerByLang()
            }
        }
        catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            console.log('\x1b[31m', "find specific Exercise by programing languge  get request by client failed ", '\x1b[0m')

        }
        res.send(result)
    })
}