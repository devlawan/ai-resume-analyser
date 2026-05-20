import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

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

    const [resumeHistory, setResumeHistory] =
        useState<any[]>([])


    useEffect(() => {

        fetchResumeHistory()

    }, [])


    const fetchResumeHistory = async () => {

        try {

            const token = localStorage.getItem(
                "token"
            )

            const response = await api.get(
                "/auth/my-resumes",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setResumeHistory(
                response.data
            )

        } catch (error) {

            console.log(error)
        }
    }


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

            fetchResumeHistory()

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


    const chartData = resumeHistory.map(
        (
            resume,
            index
        ) => ({
            name: `Resume ${index + 1}`,
            score: resume.ats_score
        })
    )


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
                        grid
                        md:grid-cols-3
                        gap-6
                        mb-8
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
                                text-slate-400
                                mb-2
                            "
                        >
                            Total Uploads
                        </h2>

                        <h1
                            className="
                                text-5xl
                                font-bold
                            "
                        >
                            {resumeHistory.length}
                        </h1>

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
                                text-slate-400
                                mb-2
                            "
                        >
                            Latest ATS Score
                        </h2>

                        <h1
                            className="
                                text-5xl
                                font-bold
                                text-blue-400
                            "
                        >
                            {
                                result?.ats_score || 0
                            }%
                        </h1>

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
                                text-slate-400
                                mb-2
                            "
                        >
                            Skills Found
                        </h2>

                        <h1
                            className="
                                text-5xl
                                font-bold
                                text-green-400
                            "
                        >
                            {
                                result?.skills?.length || 0
                            }
                        </h1>

                    </div>

                </div>


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


                <div
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-2xl
                        p-8
                        mt-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-6
                        "
                    >
                        Resume History
                    </h2>

                    <div className="space-y-4">

                        {
                            resumeHistory.map(
                                (resume) => (

                                    <div
                                        key={resume.id}
                                        className="
                                            bg-slate-800
                                            rounded-xl
                                            p-4
                                            flex
                                            justify-between
                                            items-center
                                        "
                                    >

                                        <div>

                                            <h3
                                                className="
                                                    font-semibold
                                                "
                                            >
                                                {resume.file_name}
                                            </h3>

                                            <p
                                                className="
                                                    text-slate-400
                                                    text-sm
                                                "
                                            >
                                                ATS Score:
                                                {" "}
                                                {resume.ats_score}%
                                            </p>

                                        </div>


                                        <div
                                            className="
                                                text-blue-400
                                                font-bold
                                            "
                                        >
                                            {
                                                resume.skills?.length || 0
                                            }
                                            {" "}
                                            skills
                                        </div>

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
                        p-8
                        mt-8
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-6
                        "
                    >
                        ATS Score Analytics
                    </h2>

                    <div
                        className="
                            h-[400px]
                        "
                    >

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={chartData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                />

                                <YAxis
                                    stroke="#94a3b8"
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard