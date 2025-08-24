import { Icon } from '../ui/Icon';

type ProcessCardProps = {
  icon: 'users' | 'academic-cap' | 'chart-bar';
  title: string;
  description: string;
};

export function ProcessCard({ icon, title, description }: ProcessCardProps) {
  return (
    <div className="h-full rounded-lg border bg-white shadow-sm p-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-slate-900 text-white">
        <Icon name={icon} size={22} aria-hidden="true" />
      </div>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
