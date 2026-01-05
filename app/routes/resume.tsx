import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'ResumeIQ | Analysis Results'},
    { name: 'description', content:'Detailed AI-powered analysis of your resume'},
])

const Resume = () => {
    const { auth, isLoading, fs, kv, } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob( [resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl,feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-gray-25">
            {/* Navigation */}
            <nav className='navbar'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to='/' className='back-button group'>
                            <svg
                                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col lg:flex-row">
                {/* Preview Section */}
                <section className="lg:w-5/12 xl:w-1/3 bg-white border-r border-gray-200 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-full">
                        {imageUrl && resumeUrl ? (
                            <div className="w-full max-w-md animate-scale-in">
                                <div className="card shadow-elevated overflow-hidden group">
                                    <a
                                        href={resumeUrl}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className="block relative"
                                    >
                                        {/* Loading skeleton */}
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
                                        )}

                                        <img
                                            src={imageUrl}
                                            className={`w-full h-auto object-contain transition-all duration-500 ${
                                                imageLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            alt="Resume preview"
                                            onLoad={() => setImageLoaded(true)}
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                            <div className="px-4 py-2 bg-white rounded-lg shadow-lg flex items-center gap-2">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span className="text-sm font-semibold text-gray-900">Open in New Tab</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                {/* Download hint */}
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Click to view full PDF in a new tab
                                </p>
                            </div>
                        ) : (
                            <div className="status-container">
                                <div className="loading-spinner mb-6">
                                    <div className="loading-spinner-pulse" />
                                    <div className="loading-spinner-icon">
                                        <svg
                                            className="w-8 h-8 text-white animate-pulse"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-base text-gray-600 font-medium">Loading preview...</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Analysis Section */}
                <section className="flex-1 bg-gray-25">
                    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-4">
                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sm font-medium text-blue-700">AI Analysis Complete</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">Resume Analysis</h1>
                        </div>

                        {feedback ? (
                            <div className="space-y-8">
                                <Summary feedback={feedback}/>
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                <Details feedback={feedback} />
                            </div>
                        ) : (
                            <div className="status-container">
                                <div className="loading-spinner mb-6">
                                    <div className="loading-spinner-pulse" />
                                    <div className="loading-spinner-icon">
                                        <svg
                                            className="w-8 h-8 text-white animate-pulse"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-base text-gray-600 font-medium">Analyzing your resume...</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Resume
