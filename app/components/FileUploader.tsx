import React, {useCallback, useState} from 'react'
import {useDropzone} from "react-dropzone";
import {formatSize} from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const onDrop = useCallback((acceptedFiles:File[])  => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: {'application/pdf' : ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`
                    upload-zone
                    ${isDragActive && 'upload-zone-active'}
                    ${file && 'upload-zone-success'}
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <input {...getInputProps()} />

                <div className='space-y-4'>
                    {file ? (
                        /* Selected File Display */
                        <div
                            className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-emerald-200 shadow-sm animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4">
                                {/* PDF Icon */}
                                <div className="relative">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg
                                            className="w-7 h-7 text-emerald-600"
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
                                    {/* Success checkmark */}
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* File Info */}
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">
                                        {file.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-gray-500">
                                            {formatSize(file.size)}
                                        </span>
                                        <span className="text-xs text-emerald-600 font-medium">
                                            Ready to analyze
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Remove button */}
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                                aria-label="Remove file"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 hover:text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        /* Upload Prompt */
                        <div className="animate-slide-up">
                            {/* Icon */}
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6 relative">
                                <div className={`
                                    absolute inset-0 bg-blue-100 rounded-2xl transition-all duration-300
                                    ${isHovered || isDragActive ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}
                                `} />
                                <svg
                                    className={`
                                        relative w-8 h-8 transition-all duration-300
                                        ${isDragActive ? 'text-blue-600 scale-110' : 'text-blue-500'}
                                    `}
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
                            </div>

                            {/* Text */}
                            <div className="space-y-2">
                                <p className='text-base font-semibold text-gray-900'>
                                    {isDragActive ? (
                                        <span className="text-blue-600">Drop your resume here</span>
                                    ) : (
                                        <>
                                            <span className="text-blue-600 hover:text-blue-700 transition-colors">
                                                Click to upload
                                            </span>
                                            {' '}or drag and drop
                                        </>
                                    )}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    PDF files up to {formatSize(maxFileSize)}
                                </p>
                            </div>

                            {/* Feature hints */}
                            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>ATS Score</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>AI Analysis</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span>Smart Tips</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader
