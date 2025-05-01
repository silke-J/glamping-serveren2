import e from "express";

import {
  DeleteSingle,
  GetAllStays,
  GetSingleStay,
  createStay,
  updateStay,
} from "../handlers/stay.handler.js";

import multer from "multer";

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

r.get("/stays", async (req, res) => {
  try {
    const result = await GetAllStays();

    return res.status(200).send({
      status: "ok",
      message: "Stays blev fundet",
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

r.get("/stays/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "id mangler",
        data: result,
      });
    }

    const result = await GetSingleStay(id);

    return res.status(200).send({
      status: "ok",
      message: "Stays blev fundet",
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

r.post("/stays", upld.single("image"), async (req, res) => {
  try {
    let { title, description, numberOfPersons, price, includes } = req.body;

    if (!title) {
      throw new Error("Ingen title");
    }

    if (includes) {
      includes = JSON.parse(includes);
    }

    const stay = { title, description, numberOfPersons, price, includes };

    if (req.file) {
      stay.image = process.env.SERVER_HOST + "/uploads/" + req.file.filename;
    }

    const result = await createStay(stay);

    return res.status(200).send({
      status: "ok",
      message: "Operettet med success stay blev.",
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

r.delete("/stays/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "ikke noget ID",
        data: [],
      });
    }

    const result = await DeleteSingle(id);

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

r.put("/stays", upld.single("image"), async (req, res) => {
  try {
    const { id, title, description, numberOfPersons, price, includes } =
      req.body;

    if (!id) {
      throw new Error("ingen id");
    }

    if (!title || !description || !numberOfPersons || !price || !includes) {
      throw new Error("Mangler udfylde information.");
    }

    const newData = {
      id,
      title,
      description,
      numberOfPersons,
      price,
      includes,
    };

    if (req.file) {
      newData.image = process.env.SERVER_HOST + "/uploads/" + req.file.filename;
    }

    const result = await updateStay(newData);

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
