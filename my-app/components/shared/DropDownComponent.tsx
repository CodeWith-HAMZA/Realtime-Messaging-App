"use client";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownItem = {
  type: "label" | "separator" | "item";
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon?: ReactNode;
} | null;

interface DropdownMenuProps {
  triggerText: string | React.ReactNode;
  items: DropdownItem[];
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({
  triggerText,
  items,
}) => {
  if (items.length === 0) return null;

  triggerText = triggerText || "trigger";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{triggerText}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, index) => {
          return item ? (
            <React.Fragment key={index}>
              {item.type === "label" && (
                <DropdownMenuLabel>{item.text}</DropdownMenuLabel>
              )}
              {item.type === "separator" && <DropdownMenuSeparator />}
              {item.type === "item" && (
                <DropdownMenuItem
                  className="flex justify-between"
                  onClick={item?.onClick}
                >
                  <span>{item.text}</span>
                  <span>{item?.icon}</span>
                </DropdownMenuItem>
              )}
            </React.Fragment>
          ) : null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
