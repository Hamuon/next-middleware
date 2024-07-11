import Cors from "cors";

export const cors = Cors({
  methods: ["GET", "HEAD", "DELETE", "POST", "PUT", "PATCH"],
});

export default function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
