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
    <div className="flex flex-col min-h-screen p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          {t('onboarding.dashboard.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.dashboard.description')}
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
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
                        className="flex items-center space-x-2 p-3 bg-background border rounded-lg"
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span>{section.icon}</span>
                        <span>{t(section.title)}</span>
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
        <Button onClick={onNext} className="w-full" size="lg">
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
