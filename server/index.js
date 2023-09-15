import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { checkAuth } from './utils/checkAuth.js'
import * as authController from './controllers/authController.js'
import * as tasksController from './controllers/tasksController.js'
import * as viewController from './controllers/viewController.js'
import * as listController from './controllers/listController.js'

const app = express();

app.use(cors());
app.use(express.json());

async function start() {
    try {
        await mongoose.connect(
          "mongodb+srv://admin:1234@cluster0.rdxhdtd.mongodb.net/?retryWrites=true&w=majority"
        );
    
        app.listen(3003, () => {
            console.log("serverIsWorking");
        });
    } catch (err) {
        console.log('Error: ', err)
    }
}

start()

app.post('/register', authController.register)
app.post('/login', authController.login)
app.get('/getMe', checkAuth, authController.getMe)

app.post('/createTask', checkAuth, tasksController.createTask)
app.get('/oneTask/:id', checkAuth, tasksController.oneTask)
app.get('/allTasks', checkAuth, tasksController.allTasks)
app.get('/listTasks/:id', checkAuth, tasksController.listTasks)
app.patch('/oneTask/:id', checkAuth, tasksController.updateTask)
app.delete('/oneTask/:id', checkAuth, tasksController.deleteTask)

app.get('/allViews', checkAuth, viewController.allViews)
app.get('/selectedView/:id', checkAuth, viewController.selectedView)
app.patch('/removeSelectedView/:id', checkAuth, viewController.deleteSelectedView)
app.post('/createView', checkAuth, viewController.createView)
app.delete('/deleteView/:id', checkAuth, viewController.removeView)
app.post('/addOneView/:id', checkAuth, viewController.addOneView)

app.get('/allLists', checkAuth, listController.allList)
app.post('/createList', checkAuth, listController.createList)
app.delete('/deleteList/:id', checkAuth, listController.removeList)
app.patch('/deleteFromList/:id', checkAuth, listController.removeFromList)