import dbConnect from "../dbcon.js";
import model from "../models/user.model.js";

export async function getAllUsers() {
  try {
    await dbConnect();
    const user = await model.find({});
    return user;
  } catch (error) {
    throw new Error("Fejl:", error);
  }
}

export async function GetSingleUser(id) {
  try {
    await dbConnect();
    const users = await model.findById(id);

    if (!users) {
      throw new Error("Ingen stay findes med det id.");
    }

    return users;
  } catch (error) {
    throw new Error("Fejl", error);
  }
}

export async function DeleteSingleUser(id) {
  try {
    await dbConnect();
    const user = await model.findById(id);

    if (!user) {
      throw new Error("Ikke noget stay med id'et");
    }

    //delete image hvis det findes.

    const deleted = await model.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    throw new Error("Fejl", error);
  }
}

export async function createUser(bodyObj) {
  try {
    await dbConnect();
    const user = await model.create(bodyObj);
    return user;
  } catch (error) {
    throw new Error("Fejl:", error.message);
  }
}

export async function updateUser(bodyObj) {
  try {
    await dbConnect();
    const user = await model.findById(bodyObj.id);

    if (!user) {
      return {
        status: "error",
        message: "Stay findes ikke",
        data: [],
      };
    }

    //Check om billedet er det samme i stay og bodyobj, og hvis ikke fjern biledet.

    const { id, ...updateData } = bodyObj;

    const updatedProduct = await model.findByIdAndUpdate(id, updateData);

    return updatedProduct;
  } catch (error) {
    throw new Error("Fejl:", error);
  }
}
