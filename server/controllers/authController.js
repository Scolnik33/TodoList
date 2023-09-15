import User from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "Такой пользователь уже существует",
      });
    }

    if (!password) {
      return res.json({
        message: 'Введите пароль'
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const changePassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: changePassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      newUser,
      username,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: 'Неверный пароль или логин'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Неверный пароль или логин",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      user,
      username,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.json({
        message: "Такого пользователя не сущетсвует",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
        user, 
        token
    })
  } catch (err) {
    console.log(err);
    res.json({
      message: "Не удалось получить пользователя",
    });
  }
};