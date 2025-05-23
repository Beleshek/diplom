"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function Search({ initialValue = "" }: { initialValue?: string }) {
    const [searchQuery, setSearchQuery] = useState(initialValue);
    const router = useRouter();
    const debouncedSearchTerm = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            router.push(`/search?query=${encodeURIComponent(debouncedSearchTerm)}`);
        }
    }, [debouncedSearchTerm, router]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Поиск игр..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 pl-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </form>
    );
}