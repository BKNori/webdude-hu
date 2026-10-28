import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { Trash2, Edit3, Plus, FileText, Clock } from "lucide-react";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  published: boolean;
  featured: boolean;
}

export const revalidate = 0;

async function fetchBlogPostsServer(): Promise<BlogPostItem[]> {
  if (!db) return [];
  try {
    const postsRef = collection(db, "blog_posts");
    const q = query(postsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    const posts: BlogPostItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      posts.push({
        id: docSnap.id,
        slug: data.slug || "",
        title: data.title || "Névtelen cikk",
        excerpt: data.excerpt || "",
        category: data.category || "Fejlesztés",
        date: data.date || new Date().toISOString(),
        published: data.published !== false,
        featured: data.featured === true,
      });
    });

    return posts;
  } catch {
    return [];
  }
}

export default async function AdminBlogPage() {
  const posts = await fetchBlogPostsServer();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-5 h-5 text-[#00B5F1]" />
          <h1 className="text-3xl font-extrabold text-[#00B5F1] font-mono tracking-wide uppercase">
            Blogkezelő
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Cikkek létrehozása, szerkesztése és törlése a Firestore `blog_posts` kollekciójában
        </p>
      </div>

      {/* Cikk lista */}
      <div className="bg-[#0f0f1a] border border-gray-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Meglévő cikkek ({posts.length})</h2>
          <Link
            href="/admin/hirek/uj"
            className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-white text-sm font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,181,241,0.2)]"
          >
            <Plus className="w-4 h-4" /> Új cikk létrehozása
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Még nincs egyetlen cikk sem a rendszerben.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800/50">
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Cím</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Kategória</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Dátum</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Állapot</th>
                  <th className="pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Műveletek</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-4">
                      <div className="font-medium text-slate-200">{post.title}</div>
                      <div className="text-xs text-slate-500 font-mono">{post.slug}</div>
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#00B5F1]/10 text-[#00B5F1] text-xs font-bold border border-[#00B5F1]/20">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(post.date).toLocaleDateString("hu-HU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                        post.published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {post.published ? "Közvetítve" : "Piszkozat"}
                        {post.featured && (
                          <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#00B5F1] shadow-[0_0_6px_rgba(0,181,241,0.6)]" />
                        )}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/hirek/${post.slug}`}
                          className="text-[#00B5F1] hover:text-sky-400 transition-colors"
                          title="Megnyitás az oldalon"
                        >
                          <FileText className="w-3 h-3" />
                        </Link>
                        <Link
                          href={`/admin/hirek/${post.id}/szerkesztes`}
                          className="text-slate-400 hover:text-[#00B5F1] transition-colors"
                          title="Szerkesztés"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Biztosan törölni szeretnéd a "${post.title}" cikket?`
                              )
                            ) {
                              if (db) {
                                deleteDoc(doc(db, "blog_posts", post.id));
                              }
                            }
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Törlés"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}