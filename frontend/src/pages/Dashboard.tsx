import { useState } from "react"

import { useNavigate } from "react-router-dom"

import api from "../api/client"


function Dashboard() {

    const navigate = useNavigate()

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


    const handleLogout = () => {

        localStorage.removeItem("token")

        navigate("/")
    }


    return (

        <div
            className="
                min-h-screen
                bg-slate-950
                text-white
            "
        >

            <div
                className="
                    border-b
                    border-slate-800
                    px-8
                    py-5
                    flex
                    justify-between
                    items-center
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                        "
                    >
                        AI Resume Analyzer
                    </h1>

                    <p
                        className="
                            text-slate-400
                            text-sm
                        "
                    >
                        Analyze resumes with AI
                    </p>

                </div>


                <button
                    onClick={handleLogout}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        px-5
                        py-2
                        rounded-lg
                        transition
                    "
                >
                    Logout
                </button>

            </div>


            <div
                className="
                    max-w-6xl
                    mx-auto
                    p-8
                "
            >

                <div
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-2xl
                        p-8
                        mb-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-6
                        "
                    >
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
                        className="
                            mb-6
                            block
                            w-full
                            text-sm
                            text-slate-300
                        "
                    />


                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            transition
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                        "
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

                        <div
                            className="
                                space-y-8
                            "
                        >

                            <div
                                className="
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-cyan-500
                                    rounded-2xl
                                    p-8
                                "
                            >

                                <h2
                                    className="
                                        text-2xl
                                        mb-2
                                    "
                                >
                                    ATS Score
                                </h2>

                                <h1
                                    className="
                                        text-7xl
                                        font-bold
                                    "
                                >
                                    {result.ats_score}%
                                </h1>

                            </div>


                            <div
                                className="
                                    grid
                                    md:grid-cols-2
                                    gap-6
                                "
                            >

                                <div
                                    className="
                                        bg-slate-900
                                        border
                                        border-slate-800
                                        rounded-2xl
                                        p-6
                                    "
                                >

                                    <h2
                                        className="
                                            text-2xl
                                            font-bold
                                            mb-4
                                        "
                                    >
                                        Skills
                                    </h2>

                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            gap-3
                                        "
                                    >

                                        {
                                            result.skills.map(
                                                (
                                                    skill: string
                                                ) => (

                                                    <div
                                                        key={skill}
                                                        className="
                                                            bg-green-500/20
                                                            text-green-400
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            text-sm
                                                        "
                                                    >
                                                        {skill}
                                                    </div>
                                                )
                                            )
                                        }

                                    </div>

                                </div>


                                <div
                                    className="
                                        bg-slate-900
                                        border
                                        border-slate-800
                                        rounded-2xl
                                        p-6
                                    "
                                >

                                    <h2
                                        className="
                                            text-2xl
                                            font-bold
                                            mb-4
                                        "
                                    >
                                        Missing Skills
                                    </h2>

                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            gap-3
                                        "
                                    >

                                        {
                                            result.missing_skills.map(
                                                (
                                                    skill: string
                                                ) => (

                                                    <div
                                                        key={skill}
                                                        className="
                                                            bg-red-500/20
                                                            text-red-400
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            text-sm
                                                        "
                                                    >
                                                        {skill}
                                                    </div>
                                                )
                                            )
                                        }

                                    </div>

                                </div>

                            </div>


                            <div
                                className="
                                    bg-slate-900
                                    border
                                    border-slate-800
                                    rounded-2xl
                                    p-8
                                "
                            >

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        mb-6
                                    "
                                >
                                    AI Feedback
                                </h2>

                                <pre
                                    className="
                                        whitespace-pre-wrap
                                        leading-8
                                        text-slate-300
                                    "
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