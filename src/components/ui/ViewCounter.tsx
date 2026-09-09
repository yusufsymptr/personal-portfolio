"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      try {
        // 1. Panggil fungsi RPC di Supabase untuk menambah view +1
        await supabase.rpc("increment_view_count", { page_slug: slug });

        // 2. Ambil total view terbaru dari tabel page_views
        const { data, error } = await supabase
          .from("page_views")
          .select("view_count")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        if (data) setViews(data.view_count);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    fetchAndIncrementViews();
  }, [slug]);

  if (views === null) {
    return <span className="animate-pulse bg-textPrimary/20 h-4 w-8 rounded inline-block" />;
  }

  return (
    <span className="flex items-center gap-1.5 text-sm font-medium text-textPrimary/60">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views} views
    </span>
  );
}