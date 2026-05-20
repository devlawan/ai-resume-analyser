import { useState } from "react"

import { useNavigate } from "react-router-dom"

import api from "../api/client"


function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)


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

            alert("Login successful")

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
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f4f4f4"
            }}
        >

            <div
                style={{
                    width: "350px",
                    padding: "30px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow:
                        "0 0 10px rgba(0,0,0,0.1)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    AI Resume Analyzer
                </h1>

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >

                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }

                </button>

                <p
                    style={{
                        marginTop: "20px",
                        textAlign: "center"
                    }}
                >
                    Don't have an account?

                    {" "}

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        style={{
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Register
                    </span>
                </p>

            </div>

        </div>
    )
}

export default Login