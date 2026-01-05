import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ - Smart Resume Analysis" },
    { name: "description", content: "AI-powered feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth , kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async() => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      console.log('parsedResumes',parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes();
  }, []);

  return (
      <main className="min-h-screen bg-gray-25">
        <Navbar/>

        <section className="main-section">
          {/* Hero Header */}
          <div className="page-heading">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Analysis</span>
            </div>

            <h1 className="animate-slide-down">
              Your Resume Dashboard
            </h1>

            {!loadingResumes && resumes?.length === 0 ? (
                <h2 className="animate-slide-down stagger-1">
                  Get started by uploading your first resume for instant feedback
                </h2>
            ) : (
                <h2 className="animate-slide-down stagger-1">
                  Review your submissions and AI-powered insights
                </h2>
            )}
          </div>

          {/* Loading State */}
          {loadingResumes && (
              <div className="status-container animate-slide-up">
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
                <p className="text-base text-gray-600 font-medium">Loading your resumes...</p>
              </div>
          )}

          {/* Resume Grid */}
          {!loadingResumes && resumes.length > 0 && (
              <div className="resume-grid">
                {resumes.map((resume, index) => (
                    <div
                        key={resume.id}
                        className={`animate-slide-up stagger-${Math.min(index + 1, 5)}`}
                    >
                      <ResumeCard resume={resume}/>
                    </div>
                ))}
              </div>
          )}

          {/* Empty State */}
          {!loadingResumes && resumes?.length === 0 && (
              <div className="card max-w-2xl mx-auto p-12 text-center animate-scale-in">
                {/* Illustration */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-blue-100 rounded-3xl rotate-6" />
                  <div className="absolute inset-0 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                    <svg
                        className="w-12 h-12 text-white"
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

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Ready to optimize your resume?
                </h3>
                <p className="text-base text-gray-600 mb-8 max-w-md mx-auto">
                  Upload your resume to get instant AI-powered feedback, ATS scoring, and personalized improvement tips
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">ATS Score</h4>
                    <p className="text-xs text-gray-600">See how your resume performs against applicant tracking systems</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">AI Analysis</h4>
                    <p className="text-xs text-gray-600">Get detailed feedback on content, structure, and presentation</p>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Smart Tips</h4>
                    <p className="text-xs text-gray-600">Receive actionable suggestions to improve your resume</p>
                  </div>
                </div>

                <Link
                    to="/upload"
                    className="primary-button text-base py-3 px-8 inline-flex"
                >
                  <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload Your First Resume
                </Link>
              </div>
          )}
        </section>
      </main>
  );
}