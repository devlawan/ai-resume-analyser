import { useState } from "react"

import api from "../api/client"


function Register() {

    const [fullName, setFullName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")


    const handleRegister = async () => {

        try {

            const response = await api.post(
                "/auth/register",
                {
                    full_name: fullName,
                    email,
                    password
                }
            )

            alert(
                response.data.message
            )

        } catch (error: any) {

            alert(
                error.response.data.detail
            )
        }
    }


    return (

        <div>

            <h2>
                Register
            </h2>

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                    setFullName(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br />
            <br />

            <button
                onClick={handleRegister}
            >
                Register
            </button>

        </div>
    )
}

export default Register