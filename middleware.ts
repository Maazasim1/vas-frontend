export { default } from "next-auth/middleware"

export const config = { matcher: ["/","/database","/optional","/stream"] }