import React, {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async({ companyName, jobTitle, jobDescription, file}:{ companyName:string, jobTitle:string, jobDescription:string, file:File}) => {
        setIsProcessing(true);
        setStatusText('Uploading your resume...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to Upload File');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to Convert PDF To Image');

        setStatusText('Processing image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to Upload Image');

        setStatusText('Preparing analysis...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analyzing your resume with AI...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        );
        if(!feedback) return setStatusText('Error: Failed to Analyze Resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete! Redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({companyName,jobTitle,jobDescription,file});
    }

    return (
        <main className="min-h-screen bg-gray-25">
            <Navbar/>

            <section className="main-section">
                {/* Hero Header */}
                <div className="page-heading">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-700">Powered by AI</span>
                    </div>

                    <h1 className="animate-slide-down">
                        {isProcessing ? 'Analyzing Your Resume' : 'Get Smart Feedback'}
                    </h1>

                    <h2 className="animate-slide-down stagger-1">
                        {isProcessing
                            ? 'Please wait while we process your resume'
                            : 'Upload your resume and get instant AI-powered insights to land your dream job'}
                    </h2>
                </div>

                {isProcessing ? (
                    /* Processing State */
                    <div className="card max-w-2xl mx-auto p-12 text-center animate-scale-in">
                        <div className="loading-spinner mb-8 mx-auto">
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

                        <div className="space-y-3">
                            <p className="text-lg font-semibold text-gray-900">{statusText}</p>
                            <p className="text-sm text-gray-600">This usually takes 10-30 seconds</p>
                        </div>

                        {/* Progress indicators */}
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs text-gray-600">Analyzing content</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <span className="text-xs text-gray-600">Calculating scores</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                <span className="text-xs text-gray-600">Generating tips</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Upload Form */
                    <div className="card max-w-3xl mx-auto animate-scale-in">
                        <div className="p-8 lg:p-10">
                            <form id="upload-form" onSubmit={handleSubmit}>
                                {/* Optional Job Details */}
                                <div className="space-y-6 mb-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            Job Details
                                            <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Add job information for more tailored feedback
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="form-group">
                                            <label htmlFor="company-name">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company-name"
                                                placeholder="e.g., Google"
                                                id="company-name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="job-title">
                                                Job Title
                                            </label>
                                            <input
                                                type="text"
                                                name="job-title"
                                                placeholder="e.g., Senior Software Engineer"
                                                id="job-title"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="job-description">
                                            Job Description
                                        </label>
                                        <textarea
                                            rows={4}
                                            name="job-description"
                                            placeholder="Paste the job description here for better analysis (we'll match your resume against these requirements)..."
                                            id="job-description"
                                        />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 bg-white text-sm font-medium text-gray-500">
                                            Required
                                        </span>
                                    </div>
                                </div>

                                {/* Resume Upload */}
                                <div className="form-group mb-8">
                                    <label htmlFor="uploader">
                                        Upload Resume
                                    </label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                {/* Submit Button */}
                                <button
                                    className="primary-button w-full text-base py-3 justify-center"
                                    type='submit'
                                    disabled={!file}
                                >
                                    {file ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Analyze Resume with AI
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Upload a Resume to Continue
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}
export default Upload
