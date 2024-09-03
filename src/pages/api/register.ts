import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, name, collegeName, rollNumber, phone } = req.body;

  if (!email || !password || !name || !collegeName || !rollNumber || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create the new user in the database with emailVerified set to null
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        collegeName,
        rollNumber,
        phone,
        emailVerified: null, // Initially, the email is not verified
      },
    });

    // Inform the user that they need to check their email for verification
    return res
      .status(201)
      .json({
        message:
          "User created successfully. Please check your email for verification.",
      });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
