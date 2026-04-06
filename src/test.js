import prisma from "./prisma.js";

const users = await prisma.user.findMany();
console.log(users);