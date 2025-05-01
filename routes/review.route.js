import e from "express";

import {
  DeleteSingle,
  GetAllStays,
  GetSingleStay,
  createStay,
  updateStay,
} from "../handlers/review.handler.js";

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

r.get("/reviews", async (req, res) => {
  try {
    const result = await GetAllStays();

    return res.status(200).send({
      status: "ok",
      message: "reviews blev fundet",
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

r.get("/reviews/:id", async (req, res) => {
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
      message: "reviews blev fundet",
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

r.post("/reviews", upld.single("image"), async (req, res) => {
  try {
    const { review, age, name, stay } = req.body;

    if (!review) {
      throw new Error("Ingen title");
    }

    const i = { review, age, name, stay };

    if (req.file) {
      i.image = process.env.SERVER_HOST + "/uploads/" + req.file.filename;
    }

    const result = await createStay(i);

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

r.delete("/reviews/:id", async (req, res) => {
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

r.put("/reviews", upld.single("image"), async (req, res) => {
  try {
    const { id, review, age, name, stay } = req.body;

    if (!id) {
      throw new Error("ingen id");
    }

    if (!review || !age || !name || !stay) {
      throw new Error("Mangler udfylde information.");
    }

    const newData = {
      id,
      review,
      age,
      name,
      stay,
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
