"use client";

import React from "react";
import * as Icons from "lucide-react";
import { type LucideProps } from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export default function LucideIcon({
  name,
  className = "",
  strokeWidth = 1.5,
}: LucideIconProps) {
  const emojiMap: Record<string, string> = {
    "🌐": "Globe",
    "🛒": "ShoppingCart",
    "": "MapPin",
    "🛡️": "ShieldAlert",
    "🎨": "Palette",
    "✏️": "PenTool",
    "🤖": "Bot",
    "🎬": "Video",
    "📈": "TrendingUp",
    "️": "ShoppingBag",
    "🎯": "Target",
    "🏪": "Store",
    "⚡": "Zap",
    "💳": "CreditCard",
    "📦": "Package",
    "📱": "Smartphone",
    "📝": "FileText",
    "⚙️": "Settings",
    "🔍": "Search",
    "📊": "BarChart3",
    "🔗": "Link2",
    "🧲": "Magnet",
    "🔬": "Cpu",
    "📧": "Mail",
    "🚪": "LogOut",
  };

  const resolvedName = emojiMap[name] ?? name;
  const iconKey = resolvedName as keyof typeof Icons;
  const IconComponent =
    iconKey in Icons
      ? (Icons[iconKey] as React.ComponentType<LucideProps>)
      : null;

  if (!IconComponent) {
    return <span className={className}>{name}</span>;
  }

  return (
    <IconComponent
      className={`${className} text-cyan-400`}
      strokeWidth={strokeWidth}
    />
  );
}
