import View from '../models/view.js'
import Tasks from '../models/tasks.js'
import User from '../models/auth.js'

export const createView = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const { category, task } = req.body 
        
        const newView = new View({
            category,
            task,
            author: user
        })

        await newView.save()
        await User.findByIdAndUpdate(user, {
            $push: { views: newView }
        })
        
        const views = await Promise.all(
            user.views.map((item) => {
                return View.findById(item._id)
            })
        )
        
        res.json(views)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось создать группу'
        })
    }
}

export const allViews = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const userView = await Promise.all(
            user.views.map((item) => {
                return View.findById(item._id)
            })
        )

        res.json(userView)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось получить все группы'
        })
    }
}

export const selectedView = async (req, res) => {
    try {
        const viewPage = await View.findById(req.params.id)
        const viewsItems = await Promise.all(
            viewPage.viewItems.map((item) => {
                return Tasks.findById(item)
            })
        )

        res.json(viewsItems)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось получить выбранные группы'
        })
    }
}

export const deleteSelectedView = async (req, res) => {
    try {
        const viewPage = await View.findById(req.params.id)
        const { _id } = req.body

        await View.findByIdAndUpdate(viewPage, {
            $pull: { viewItems: _id }
        })

        const viewsItems = await Promise.all(
            viewPage.viewItems.filter((item) => {
                if (item._id != _id) {
                    return Tasks.findById(item)
                }
            }).map((item) => Tasks.findById(item))
        )
        
        res.json(viewsItems)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось удалить выбранную группу'
        })
    }
}

export const removeView = async (req, res) => {
    try {
        const { _id } = await View.findByIdAndDelete(req.params.id)
        const user = await User.findById(req.userId)

        await User.findByIdAndUpdate(user, {
            $pull: { views: _id }
        })

        res.json({
            message: 'Успешно удаленно'
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось удалить группу'
        })
    }
}

export const addOneView = async (req, res) => {
    try {
        let f = false;
        const viewPage = await View.findById(req.params.id)
        const id = req.body
        const { _id, category, task } = await Tasks.findById(id)

        await Promise.all(
            viewPage.viewItems.map((item) => {
                if (item == _id) {
                    f = true
                }
            })
        )

        if (f) {
            return res.json(viewPage.viewItems)
        }

        const newTask = { _id, category, task }

        await View.findByIdAndUpdate(viewPage, {
            $push: { viewItems: newTask }
        })

        res.json([newTask])
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось добавить группу'
        })
    }
}