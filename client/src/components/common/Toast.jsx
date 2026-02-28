import React from 'react';

const Toast = ({ message, type, onClose }) => {
    const typeStyles = {
        success: 'border-green-500/50 bg-green-500/10 text-green-400',
        error: 'border-red-500/50 bg-red-500/10 text-red-400',
        info: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
        warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
    };

    const icons = {
        success: (
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div className={`
      toast-notification pointer-events-auto
      flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl 
      shadow-2xl shadow-black/20 min-w-[300px] max-w-md
      ${typeStyles[type] || typeStyles.info}
    `}>
            <div className="flex-shrink-0">
                {icons[type] || icons.info}
            </div>
            <p className="flex-1 text-sm font-bold tracking-wide">
                {message}
            </p>
            <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors opacity-60 hover:opacity-100"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
