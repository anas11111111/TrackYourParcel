import res from "express/lib/response";
import { GeneralError } from "../utils/errors"

export const handleErrors = async (err, req, res, next) => {
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
        // return res.status(code).json({
        //     name: err.name,
        //     message: err.message
        // });
    }
    let correlationId = req.headers['x-correlation-id'];
    return res.status(code).json({

        name: "Internal Server Error",
        correlationId: correlationId,
        message: err.message
    });
}