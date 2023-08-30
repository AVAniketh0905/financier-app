import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Category } from '@prisma/client';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './ui/tooltip';

interface NotificationProps {
  category: Category;
  Icon: LucideIcon;
  value: number;
  title?: string;
  message?: string;
}

export function ToolTipFunc({
  Icon,
  content,
}: {
  Icon: LucideIcon;
  content: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <Icon size={24} />
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Notification({
  category,
  Icon,
  title,
  message,
  value,
}: NotificationProps) {
  if (title && message)
    return (
      <Card className='m-0 p-0'>
        <CardHeader>{title}</CardHeader>
        <CardContent className='relative m-0 inline-flex w-full p-2'>
          {message}
        </CardContent>
        <CardContent className='relative m-0 inline-flex w-full p-2'>
          <ToolTipFunc Icon={Icon} content={category} />
          <div className='absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary text-center text-sm text-secondary'>
            {value}
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card className='m-0 p-0'>
      <CardContent className='relative m-0 inline-flex w-full p-2'>
        <ToolTipFunc Icon={Icon} content={category} />
        <div className='absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary text-center text-xs text-secondary'>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
