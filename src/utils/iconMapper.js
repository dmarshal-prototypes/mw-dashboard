import { TrendingUp, BookOpen, Video, FileText, Sparkles } from 'lucide-react';

export const getTypeIcon = (type) => {
  const iconMap = {
    release: TrendingUp,
    doc: BookOpen,
    video: Video,
    blog: FileText,
    example: FileText,
  };

  const IconComponent = iconMap[type] || Sparkles;
  return IconComponent;
};
