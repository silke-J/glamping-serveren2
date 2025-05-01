import dbConnect from "../dbcon.js";
import model from "../models/review.model.js";

export async function GetAllStays() {
  try {
    await dbConnect();
    const stays = await model.find({});
    return stays;
  } catch (error) {
    throw new Error("Fejl:", error);
  }
}

export async function GetSingleStay(id) {
  try {
    await dbConnect();
    const stays = await model.findById(id);

    if (!stays) {
      throw new Error("Ingen review findes med det id.");
    }

    return stays;
  } catch (error) {
    throw new Error("Fejl", error);
  }
}

export async function DeleteSingle(id) {
  try {
    await dbConnect();
    const stays = await model.findById(id);

    if (!stays) {
      throw new Error("Ikke noget activity med id'et");
    }

    //delete image hvis det findes.

    const deleted = await model.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    throw new Error("Fejl", error);
  }
}

export async function createStay(bodyObj) {
  try {
    await dbConnect();
    const stay = await model.create(bodyObj);
    return stay;
  } catch (error) {
    throw new Error("Fejl:", error);
  }
}

export async function updateStay(bodyObj) {
  try {
    await dbConnect();
    const stay = await model.findById(bodyObj.id);

    if (!stay) {
      return {
        status: "error",
        message: "Review findes ikke",
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
