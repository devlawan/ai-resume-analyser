import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import api from "../api/client"


function Login() {

    const navigate = useNavigate()

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


    const handleLogin = async () => {

        if (!email || !password) {

            alert("Please fill all fields")

            return
        }

        try {

            setLoading(true)

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            )

            localStorage.setItem(
                "token",
                response.data.access_token
            )

            navigate("/dashboard")

        } catch (error: any) {

            alert(
                error?.response?.data?.detail
                ||
                "Login failed"
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
                        AI Resume Analyzer
                    </h1>

                    <p
                        className="
                            text-slate-400
                        "
                    >
                        Analyze resumes with AI
                    </p>

                </div>


                <div className="space-y-5">

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
                        onClick={handleLogin}
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
                                ? "Logging in..."
                                : "Login"
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

                    Don't have an account?

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        className="
                            text-blue-500
                            ml-2
                            cursor-pointer
                            font-semibold
                            hover:text-blue-400
                        "
                    >
                        Register
                    </span>

                </div>

            </div>

        </div>
    )
}

export default Login