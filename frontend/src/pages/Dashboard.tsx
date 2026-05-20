import { useState } from "react"

import api from "../api/client"


function Dashboard() {

    const [file, setFile] = useState<File | null>(
        null
    )

    const [result, setResult] = useState<any>(
        null
    )

    const [loading, setLoading] = useState(false)


    const handleUpload = async () => {

        if (!file) {

            alert("Please select a PDF")

            return
        }

        const formData = new FormData()

        formData.append(
            "file",
            file
        )

        try {

            setLoading(true)

            const token = localStorage.getItem(
                "token"
            )

            const response = await api.post(
                "/auth/upload-resume",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setResult(
                response.data
            )

        } catch (error) {

            console.log(error)

            alert("Upload failed")

        } finally {

            setLoading(false)
        }
    }


    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                padding: "40px"
            }}
        >

            <div
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "40px"
                    }}
                >
                    AI Resume Analyzer
                </h1>


                <div
                    style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow:
                            "0 0 10px rgba(0,0,0,0.1)",
                        marginBottom: "30px"
                    }}
                >

                    <h2>
                        Upload Resume
                    </h2>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {

                            if (e.target.files) {

                                setFile(
                                    e.target.files[0]
                                )
                            }
                        }}
                    />

                    <br />
                    <br />

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        style={{
                            padding: "12px 20px",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "#2563eb",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >

                        {
                            loading
                                ? "Analyzing Resume..."
                                : "Upload Resume"
                        }

                    </button>

                </div>


                {
                    result && (

                        <div>

                            <div
                                style={{
                                    backgroundColor: "white",
                                    padding: "30px",
                                    borderRadius: "12px",
                                    boxShadow:
                                        "0 0 10px rgba(0,0,0,0.1)",
                                    marginBottom: "20px"
                                }}
                            >

                                <h2>
                                    ATS Score
                                </h2>

                                <h1
                                    style={{
                                        color: "#2563eb",
                                        fontSize: "48px"
                                    }}
                                >
                                    {result.ats_score}%
                                </h1>

                            </div>


                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "20px",
                                    marginBottom: "20px"
                                }}
                            >

                                <div
                                    style={{
                                        backgroundColor:
                                            "white",
                                        padding: "20px",
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 0 10px rgba(0,0,0,0.1)"
                                    }}
                                >

                                    <h2>
                                        Skills
                                    </h2>

                                    <ul>

                                        {
                                            result.skills.map(
                                                (
                                                    skill: string
                                                ) => (

                                                    <li
                                                        key={skill}
                                                    >
                                                        {skill}
                                                    </li>
                                                )
                                            )
                                        }

                                    </ul>

                                </div>


                                <div
                                    style={{
                                        backgroundColor:
                                            "white",
                                        padding: "20px",
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 0 10px rgba(0,0,0,0.1)"
                                    }}
                                >

                                    <h2>
                                        Missing Skills
                                    </h2>

                                    <ul>

                                        {
                                            result.missing_skills.map(
                                                (
                                                    skill: string
                                                ) => (

                                                    <li
                                                        key={skill}
                                                    >
                                                        {skill}
                                                    </li>
                                                )
                                            )
                                        }

                                    </ul>

                                </div>

                            </div>


                            <div
                                style={{
                                    backgroundColor:
                                        "white",
                                    padding: "30px",
                                    borderRadius: "12px",
                                    boxShadow:
                                        "0 0 10px rgba(0,0,0,0.1)"
                                }}
                            >

                                <h2>
                                    AI Feedback
                                </h2>

                                <pre
                                    style={{
                                        whiteSpace:
                                            "pre-wrap",
                                        lineHeight: "1.6"
                                    }}
                                >
                                    {
                                        result.ai_feedback
                                    }
                                </pre>

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Dashboard