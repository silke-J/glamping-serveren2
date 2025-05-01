import e from "express";

import {
  DeleteSingleUser,
  getAllUsers,
  GetSingleUser,
  createUser,
  updateUser,
} from "../handlers/user.handler.js";

import multer from "multer";
import { DeleteSingle } from "../handlers/stay.handler.js";

const r = e.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upld = multer({ storage });

r.get("/users", async (req, res) => {
  try {
    const result = await getAllUsers();

    return res.status(200).send({
      status: "ok",
      message: "Users blev fundet",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

r.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "id mangler",
        data: result,
      });
    }

    const result = await GetSingleUser(id);

    return res.status(200).send({
      status: "ok",
      message: "Users blev fundet",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

r.post("/users", upld.single("image"), async (req, res) => {
  try {
    const { name, email, hashedPassword, role } = req.body;

    if (!name || !email || !hashedPassword || !role) {
      throw new Error("Mangler enten name, email, hashedPassword eller role");
    }

    const user = { name, email, hashedPassword, role };

    if (req.file) {
      user.image = process.env.SERVER_HOST + "/uploads/" + req.file.filename;
    }

    const result = await createUser(user);

    return res.status(200).send({
      status: "ok",
      message: "Operettet med success user blev.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

r.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "ikke noget ID",
        data: [],
      });
    }

    const result = await DeleteSingleUser(id);

    return res.status(200).send({
      status: "ok",
      message: "fjernet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

r.put("/users", upld.single("image"), async (req, res) => {
  try {
    const { id, name, email, hashedPassword, role } = req.body;

    if (!id) {
      throw new Error("ingen id");
    }

    if (!name || !email || !hashedPassword || !role) {
      throw new Error("Mangler enten name, email, hashedPassword eller role");
    }

    const newData = {
      id,
      name,
      email,
      hashedPassword,
      role,
    };

    if (req.file) {
      newData.image = process.env.SERVER_HOST + "/uploads/" + req.file.filename;
    }

    const result = await updateUser(newData);

    return res.status(200).send({
      status: "ok",
      message: "opdateret",
      data: newData.id,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

export default r;
