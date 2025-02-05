import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

export interface DashboardSection {
  id: string;
  icon: string;
  title: string;
}

export const DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    id: 'todays-horoscope',
    icon: '🌟',
    title: 'onboarding.dashboard.sections.todaysHoroscope',
  },
  {
    id: 'ai-chat',
    icon: '🤖',
    title: 'onboarding.dashboard.sections.aiChat',
  },
  {
    id: 'planetary-events',
    icon: '🪐',
    title: 'onboarding.dashboard.sections.planetaryEvents',
  },
  {
    id: 'remedies',
    icon: '🔮',
    title: 'onboarding.dashboard.sections.remedies',
  },
  {
    id: 'saved-predictions',
    icon: '📌',
    title: 'onboarding.dashboard.sections.savedPredictions',
  },
];

export interface DashboardSetupProps {
  onNext: () => void;
  sectionOrder: string[];
  onOrderChange: (newOrder: string[]) => void;
}

export const DashboardSetup: React.FC<DashboardSetupProps> = ({
  onNext,
  sectionOrder,
  onOrderChange,
}) => {
  const { t } = useTranslation();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onOrderChange(items);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-8 bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          {t('onboarding.dashboard.title')}
        </h2>
        <p className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          {t('onboarding.dashboard.description')}
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {sectionOrder.map((sectionId, index) => {
                const section = DASHBOARD_SECTIONS.find((s) => s.id === sectionId);
                if (!section) return null;

                return (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10 hover:shadow-[0_0_1rem_-0.25rem_#3b82f6]"
                      >
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        <div className="relative flex items-center space-x-4">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab transition-colors group-hover:text-blue-400"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <span className="text-2xl filter group-hover:brightness-110">{section.icon}</span>
                          <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent group-hover:to-white">
                            {t(section.title)}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-[1px] transition-all hover:shadow-[0_0_2rem_-0.5rem_#3b82f6]"
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('common.next')}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
