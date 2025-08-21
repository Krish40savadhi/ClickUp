import { api } from "./api";

const generateToken = () =>
  (crypto?.getRandomValues
    ? Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, "0")).join("")
    : Math.random().toString(36).slice(2));

export async function loginRequest(email,password){
        const {data} = await api.get("/employees",{params:{email,password}});
        if (data.length !==1){
            throw new Error("Invalid Email or Password");
        }
        const user = data[0];
        const token = generateToken();
        return{
            token,
            user:{
                id:user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department || "",
                designation: user.designation || ""
            }
        };
    }