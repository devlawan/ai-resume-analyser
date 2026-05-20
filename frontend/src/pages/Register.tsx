import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import api from "../api/client"


function Register() {

    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const token = localStorage.getItem(
            "token"
        )

        if (token) {

            navigate("/dashboard")
        }

    }, [])


    const handleRegister = async () => {

        if (
            !fullName
            ||
            !email
            ||
            !password
        ) {

            alert("Please fill all fields")

            return
        }

        try {

            setLoading(true)

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

            navigate("/")

        } catch (error: any) {

            alert(
                error?.response?.data?.detail
                ||
                "Registration failed"
            )

        } finally {

            setLoading(false)
        }
    }


    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-950
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                    shadow-2xl
                "
            >

                <div className="text-center mb-8">

                    <h1
                        className="
                            text-4xl
                            font-bold
                            text-white
                            mb-2
                        "
                    >
                        Create Account
                    </h1>

                    <p
                        className="
                            text-slate-400
                        "
                    >
                        Start analyzing resumes with AI
                    </p>

                </div>


                <div className="space-y-5">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    />


                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    />


                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-slate-800
                            border
                            border-slate-700
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    />


                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-blue-400
                            transition
                            text-white
                            p-4
                            rounded-xl
                            font-semibold
                        "
                    >

                        {
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }

                    </button>

                </div>


                <div
                    className="
                        mt-6
                        text-center
                        text-slate-400
                    "
                >

                    Already have an account?

                    <span
                        onClick={() =>
                            navigate("/")
                        }
                        className="
                            text-blue-500
                            ml-2
                            cursor-pointer
                            font-semibold
                            hover:text-blue-400
                        "
                    >
                        Login
                    </span>

                </div>

            </div>

        </div>
    )
}

export default Register