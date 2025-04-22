import db  from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const userExists = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    ).run(name, email, hashedPassword);

    return NextResponse.json(
      { success: true },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}