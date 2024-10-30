import { betterAuth } from "better-auth";
import { config } from 'dotenv';
import pkg from "pg";
 
const {Pool} = pkg

config()

export const auth = betterAuth({
  database: new Pool({connectionString: process.env.AUTH_DB_URL}),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
})