import React from 'react';
import { Crown, Sparkles, Shield, ShieldCheck } from 'lucide-react';

interface RoleTagStyle {
  label: string;
  icon: React.ReactNode;
  className: string;
}

const getRoleTagStyle = (role: string): RoleTagStyle => {
  switch (role) {
    case 'Backbone':
      return {
        label: 'BACKBONE',
        icon: <Crown className="w-2.5 h-2.5" />,
        className: 'text-amber-800 bg-amber-100 border-amber-300',
      };
    case 'Lead Organizer':
      return {
        label: 'LEAD ORG',
        icon: <Sparkles className="w-2.5 h-2.5" />,
        className: 'text-flame-dark bg-flame/20 border-flame/40',
      };
    case 'Organizer':
      return {
        label: 'ORGANIZER',
        icon: <Shield className="w-2.5 h-2.5" />,
        className: 'text-sun-dark bg-sun/30 border-sun/60',
      };
    case 'Event Incharge':
      return {
        label: 'EVENT INCHARGE',
        icon: <ShieldCheck className="w-2.5 h-2.5" />,
        className: 'text-orange-700 bg-orange-100 border-orange-300',
      };
    default:
      return {
        label: role.toUpperCase(),
        icon: <Shield className="w-2.5 h-2.5" />,
        className: 'text-ink bg-white/90 border-black/15',
      };
  }
};

export const RoleTag: React.FC<{ role: string; className?: string }> = ({ role, className = '' }) => {
  const style = getRoleTagStyle(role);
  return (
    <div
      className={`absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md border backdrop-blur-md font-mono text-[9px] font-bold uppercase tracking-widest shadow-sm ${style.className} ${className}`}
    >
      {style.icon}
      <span>{style.label}</span>
    </div>
  );
};

export default RoleTag;
