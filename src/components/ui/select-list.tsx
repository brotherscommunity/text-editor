import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { memo } from "react";

function SelectList({
  className = "",
  selectLabel = "Select",
  value,
  label,
  data = [],
  onSelect,
}: {
  selectLabel?: string;
  data: any[];
  onSelect: (arg: any) => void;
  className?: string;
  value: keyof (typeof data)[number];
  label: keyof (typeof data)[number];
}) {
  return (
    <Select onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder={selectLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel></SelectLabel> */}
          {data.map((item) => (
            <SelectItem
              key={item[value]}
              value={item[value]}
              onClick={() => onSelect(item)}
            >
              {item[label]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default memo(SelectList);
