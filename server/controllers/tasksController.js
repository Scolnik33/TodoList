import Tasks from '../models/tasks.js'
import List from '../models/list.js'
import View from '../models/view.js'
import User from '../models/auth.js'

export const createTask = async (req, res) => {
    try {
        const { category, task } = req.body

        const newTask = new Tasks({
            category,
            task,
            author: req.userId
        })

        await newTask.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { tasks: newTask }
        })

        res.json({
            newTask
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось создать пост'
        })
    }
}

export const allTasks = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const userTasks = await Promise.all(
            user.tasks.map((item) => {
                return Tasks.findById(item._id)
        })) 

        res.json(userTasks)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось получить все задания'
        })
    }
}

export const oneTask = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id)

        res.json(task)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось получить одну задачу'
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { category, task } = req.body
        const Task = await Tasks.findById(req.params.id)

        Task.category = category
        Task.task = task

        await Task.save()

        res.json(Task)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось обновить задачу'
        })
    }
}
 
export const deleteTask = async (req, res) => {
    try {
        const { _id } = await Tasks.findById(req.params.id)
        const user = await User.findById(req.userId)
        await Tasks.findByIdAndDelete(req.params.id)

        await User.findByIdAndUpdate(user, {
            $pull: { tasks: _id }
        })

        const tasks = await Tasks.find()
        const view = await View.find({ viewItems: req.params.id })
        
        for (let i = 0; i < view.length; i++) {
            await View.findByIdAndUpdate(view[i], {
                $pull: { viewItems: req.params.id }
            })
        }

        res.json({
            tasks,
            message: 'Задача успешно удалена'
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось удалить задачу'
        })
    }
}

export const listTasks = async (req, res) => {
    try {
        const test = []
        const list = await List.findById(req.params.id)
        const user = await User.findById(req.userId)
        const category = list.category
        const tasks = await Promise.all(
            user.tasks.map((item) => {
                return Tasks.findById(item)
            })
        )
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].category == category) {
                test.push(tasks[i])
            }
        }
        
        res.json(test)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось отсортировать листы'
        })
    }
}