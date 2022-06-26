import classNames from 'classnames';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ availableAt, title, slug, type }: LessonProps) {
  const { slug: slugParams } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availabeDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'", {
    locale: ptBR
  });

  const isActiveLesson = slug === slugParams;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availabeDateFormatted}</span>
      <div
        className={classNames(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
          { 'bg-green-500': isActiveLesson }
        )}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames('flex items-center gap-2 text-sm font-medium', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson
              })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classNames(
              'text-xs rounded py-[0.125rem] px-2 text-white border font-bold',
              {
                'border-white': isActiveLesson,
                'border-green-300': !isActiveLesson
              }
            )}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTCIA'}
          </span>
        </header>
        <strong
          className={classNames('mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200 ': !isActiveLesson
          })}>
          {title}
        </strong>
      </div>
    </Link>
  );
}
