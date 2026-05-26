"use client";

import { useState } from "react";
import { links as initialLinks, getFaviconUrl } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function Page() {
  const [linkList, setLinkList] = useState(initialLinks);
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");
    if (!newTitle.trim() || !newUrl.trim()) return;

    let finalUrl = newUrl.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = `https://${finalUrl}`;
    }

    try {
      new URL(finalUrl);
    } catch (_) {
      setUrlError("유효한 URL 형식이 아닙니다.");
      return;
    }

    const newLink = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      url: finalUrl,
      createdAt: Date.now(),
    };

    setLinkList((prev) => [newLink, ...prev]);
    setNewTitle("");
    setNewUrl("");
    setUrlError("");
    setIsOpen(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center py-16 px-4 sm:px-6 overflow-hidden">
      {/* 
        Modern Background: Dark Theme with Vibrant Ambient Glows (Mesh Gradient Effect)
      */}
      <div className="fixed inset-0 z-0 bg-slate-950">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-12 mt-4">
        {/* Profile Header Section */}
        <div className="flex flex-col items-center text-center">
          
          {/* Avatar with dynamic gradient ring and glow */}
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border-4 border-slate-950 overflow-hidden shadow-inner">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-wider">
                  HY
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-pink-200 tracking-tight drop-shadow-sm">
            Han Yeji
          </h1>
          <p className="text-slate-300 mt-3 font-medium text-sm sm:text-base leading-relaxed px-4">
            크리에이터를 위한 특별한 멀티 링크 프로필 공간입니다. 나를 돋보이게 하는 한 줄 소개를 적어보세요.
          </p>
        </div>

        {/* Action / Add Link Section */}
        <div className="flex justify-center">
          <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setNewTitle("");
              setNewUrl("");
              setUrlError("");
            }
          }}>
            <DialogTrigger render={<Button className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300" />}>
              <Plus className="w-4 h-4 mr-2" />
              링크 추가
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
              <DialogHeader>
                <DialogTitle>새 링크 추가</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddLink} className="space-y-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300">타이틀</Label>
                  <Input
                    id="title"
                    placeholder="예: 내 유튜브 채널"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-slate-300">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://youtube.com/..."
                    value={newUrl}
                    onChange={(e) => {
                      setNewUrl(e.target.value);
                      if (urlError) setUrlError("");
                    }}
                    className={`bg-slate-950 text-white placeholder:text-slate-500 ${
                      urlError ? "border-red-500 focus-visible:ring-red-500" : "border-slate-800"
                    }`}
                    autoComplete="off"
                    type="url"
                  />
                  {urlError && <p className="text-red-400 text-sm mt-1">{urlError}</p>}
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-slate-800 hover:text-white"
                  >
                    취소
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!newTitle.trim() || !newUrl.trim()}
                  >
                    추가하기
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Link List Section */}
        <div className="flex flex-col gap-4">
          {linkList.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl"
            >
              {/* 
                Glassmorphism Card leveraging shadcn's Card component.
                Overriding background, border, and hover animations for premium look.
              */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl overflow-hidden">
                <CardContent className="flex items-center p-4">
                  
                  {/* Link Icon / Favicon Container */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 p-2.5 shadow-inner border border-white/5 flex items-center justify-center">
                    <img
                      src={getFaviconUrl(link.url)}
                      alt={`${link.title} icon`}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  
                  {/* Centered Link Title */}
                  <div className="flex-1 text-center pr-12">
                    <span className="font-semibold text-slate-100 text-lg tracking-wide">
                      {link.title}
                    </span>
                  </div>
                  
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
