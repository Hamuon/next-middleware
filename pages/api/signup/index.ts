import Client from "@/models/ClientModel";
import connectMongoDB from "@/utils/mongodb";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { cors } from "../cors";
import runMiddleware from "../cors";

export default async function handler(req: any, res: any) {
  await runMiddleware(req, res, cors);

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ error: "Please fill all fields." });
    return;
  }

  await connectMongoDB()
    .then(async () => {
      const exists = await Client.findOne({ email });

      if (exists) {
        res.status(409).json({ error: "This Email Exists." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const client = new Client({
        fullName,
        email,
        password: hashedPassword,
      });

      try {
        const savedClient = await client.save();

        const token = jwt.sign(
          { clientId: savedClient._id },
          process.env.SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.status(201).json({
          token,
          client: {
            id: savedClient.id,
            fullName: savedClient.fullName,
            email: savedClient.email,
          },
        });
      } catch (error) {
        res.status(400).json({ error });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
}
