import List from '../models/list.js'
import User from '../models/auth.js'
import Tasks from '../models/tasks.js'

export const createList = async (req, res) => {
    try {
        let isHas = false
        const { category } = req.body
        const user = await User.findById(req.userId)
        const userLists = await Promise.all(
            user.lists.map((item) => {
                return List.findById(item)
            })
        )

        for (let i = 0; i < userLists.length; i++) {
            if (userLists[i].category == category) {
                isHas = true
            }
        }

        if (isHas) {
            return res.json({
                message: 'Такой лист уже существует'
            })
        }

        const newList = new List({
            category,
            author: user
        })

        await newList.save()
        await User.findByIdAndUpdate(user, {
            $push: { lists: newList }
        })

        res.json(newList)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось создать лист'
        })
    }
}

export const allList = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const userLists = await Promise.all(
            user.lists.map((item) => {
                return List.findById(item._id)
            })
        )

        res.json(userLists)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось получить листы'
        })
    }
}

export const removeList = async (req, res) => {
    try {
        const { _id } = await List.findByIdAndDelete(req.params.id)
        const user = await User.findById(req.userId)

        await User.findByIdAndUpdate(user, {
            $pull: { lists: _id }
        })

        res.json({
            message: 'Группа успешно удалена'
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось удалить лист'
        })
    }
}

export const removeFromList = async (req, res) => {
    try {
        const listPage = await List.findById(req.params.id)
        const { _id } = req.body

        await List.findByIdAndUpdate(listPage, {
            $pull: { listItems: _id }
        })

        const listArr = await Promise.all(
            listPage.listItems.filter((item) => {
                if (item._id != _id) {
                    return Tasks.findById(item)
                }
            }).map((item) => Tasks.findById(item))
        )

        res.json(listArr)
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось удалить задачу из листа'
        })
    }
}