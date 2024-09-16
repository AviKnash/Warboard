import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CommonCardProps {
  title: string;
  description?: string;
  className?: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
}

const CommonCard: React.FC<CommonCardProps> = ({
  title,
  description,
  className,
  headerContent,
  children,
  footerContent,
}) => {
  return (
    <Card
      className={cn(
        "flex-1 rounded-lg m-4 shadow-md flex flex-col",
        "transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg",
        className
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {headerContent}
      </CardHeader>
      <CardContent className="flex-grow">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex justify-center mt-auto">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default CommonCard;