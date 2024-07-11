import Client from "@/models/ClientModel";
import connectMongoDB from "@/utils/mongodb";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { cors } from "../cors";
import runMiddleware from "../cors";

async function login(email: string, password: string) {
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const client = await Client.findOne({ email });
  if (!client) {
    throw Error("Email not found.");
  }

  const match = await bcrypt.compare(password, client.password);
  if (!match) {
    throw Error("ٌWrong password!");
  }

  return client;
}

export default async function handler(req: any, res: any) {
  await runMiddleware(req, res, cors);
  const { email, password } = req.body;
  await connectMongoDB()
    .then(async () => {
      try {
        const client = await login(email, password);

        const token = jwt.sign({ clientId: client._id }, process.env.SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({ email, token });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
}
