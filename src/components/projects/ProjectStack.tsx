import { useState } from 'react';
import { AnimatedContainer } from '@/components/animations/AnimatedContainer';

interface ProjectStackProps {
  technologies: string[];
  maxVisible?: number;
  className?: string;
}

const categoryColors: Record<string, string> = {
  'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'React.js': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Next.js': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
  'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Tailwind CSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  'Python': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'FastAPI': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Docker': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Supabase': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'FAISS': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'LLaMA3': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'YOLOv8': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'OpenCV': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'WebSockets': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Java': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'C++': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'SQL': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
  'AWS': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Git': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Linux': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const getDefaultColor = () => 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';

export const ProjectStack = ({ 
  technologies, 
  maxVisible = 5,
  className = '' 
}: ProjectStackProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowExpand = technologies.length > maxVisible;
  const visibleTechs = isExpanded ? technologies : technologies.slice(0, maxVisible);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleTechs.map((tech, index) => {
        const colorClass = categoryColors[tech] || getDefaultColor();
        
        return (
          <AnimatedContainer
            key={tech}
            delay={index * 0.05}
            className="inline-block"
            as="span"
          >
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-transform duration-200 hover:scale-105 ${colorClass}`}
            >
              {tech}
            </span>
          </AnimatedContainer>
        );
      })}
      
      {shouldShowExpand && !isExpanded && (
        <AnimatedContainer delay={maxVisible * 0.05} className="inline-block" as="span">
          <button
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
          >
            +{technologies.length - maxVisible} more
          </button>
        </AnimatedContainer>
      )}
      
      {isExpanded && (
        <AnimatedContainer delay={0} className="inline-block" as="span">
          <button
            onClick={() => setIsExpanded(false)}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
          >
            Show less
          </button>
        </AnimatedContainer>
      )}
    </div>
  );
};