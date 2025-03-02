"use client";
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsDown, Loader2Icon } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { NextApiClient } from "@/lib/api-client";
import { useDebouncedVal } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getSearchResult = async (query: string, url: string) => {
  // const questionMark = url.includes("?");

  return await NextApiClient.get(
    `${url}${url.includes("?") ? "&" : "?"}query=${query}`
  );
};

export type selectReset = { reset: () => void };

const SelectInput = forwardRef(
  (
    {
      url,
      label,
      value,
      inputName,
      placeHolder,
      onSelect = (arg) => {},
      listData,
      selectIndex = 0,
      defaultValue,
      className,
      optional = false,
      prefetch = true,
    }: {
      url: string;
      label: string;
      inputName?: string;
      value: string;
      placeHolder: string;
      onSelect?: (arg: any) => void;
      listData?: readonly any[];
      selectIndex?: number;
      defaultValue?: any[] | readonly [];
      className?: string;
      optional?: boolean;
      prefetch?: boolean;
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState("");
    const [selected, setSelected] = useState<any>();
    const [prefetchNow, setPrefetchNow] = useState(false);

    const dval = useDebouncedVal(searchValue);

    useImperativeHandle(ref, () => ({
      reset() {
        setSelected(null);
        setSearchValue("");
        onSelect(undefined);
      },
    }));

    const {
      data: fetchedData,
      isPending,
      isError,
      error,
    } = useQuery({
      queryKey: ["select", url, dval],
      queryFn: () => getSearchResult(dval, url),
      enabled: (dval.trim()?.length > 2 || prefetchNow) && !listData && !!url,
    });

    const data = useMemo(() => {
      if (listData) {
        if (selectIndex) {
          setSelected(listData.find((d) => d.id === selectIndex));
        } else if (selectIndex === 0) {
          setSelected(listData[0]);
        }
        return listData;
      }

      if (defaultValue && !dval) {
        setSelected(defaultValue[0]);
        return defaultValue;
      }
      if (fetchedData) {
        return fetchedData;
      }
      return [];
    }, [url, listData, fetchedData, dval, defaultValue, selectIndex]);

    return (
      <div className="" data-testid="select-input">
        <input
          type="text"
          name={inputName}
          className="sr-only"
          defaultValue={selected && selected[value]}
          required={!optional}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                `flex h-14 w-full rounded-md bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300`,
                className
              )}
              onClick={() => {
                if (prefetch && !prefetchNow) {
                  setPrefetchNow(true);
                }
              }}
            >
              <div className="w-full flex flex-wrap text-wrap font-medium overflow-x-hidden">
                {selected ? (
                  selected[label]
                ) : (
                  <span className="text-input ">{placeHolder}</span>
                )}
              </div>
              <ChevronsDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search..."
                className="h-9 px-2 mt-4 w-[100%] "
                onValueChange={(value) => setSearchValue(value)}
                value={searchValue}
                disabled={!!listData}
              />
              <CommandList>
                <CommandEmpty className="h-fit">
                  {isError ? (
                    ""
                  ) : isPending ? (
                    ""
                  ) : (
                    <div className="text-center py-2">No result found.</div>
                  )}
                </CommandEmpty>
                <CommandGroup forceMount={true}>
                  {listData || (defaultValue && !dval) ? (
                    data.map((item: any, i: number) => (
                      <CommandItem
                        key={i}
                        onSelect={() => {
                          setSelected((oldItem: any) =>
                            oldItem && item[value] === oldItem[value]
                              ? undefined
                              : item
                          );
                          onSelect(item);
                        }}
                      >
                        {item[label]}
                        <Check
                          className={`ml-auto ${
                            item === selected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </CommandItem>
                    ))
                  ) : isError ? (
                    <div className="text-center py-2">Something went wrong</div>
                  ) : isPending ? (
                    dval.trim().length > 2 || prefetch ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader2Icon
                          className="animate-spin w-4 h-4"
                          data-testid="spinning icon"
                        />
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    data.data.map((item: any, i: number) => (
                      <CommandItem
                        key={i}
                        onSelect={() => {
                          setSelected((oldItem: any) =>
                            oldItem && item[value] === oldItem[value]
                              ? undefined
                              : item
                          );
                          onSelect(item);
                        }}
                        className="cursor-pointer mb-1"
                      >
                        {item[label]}
                        <Check
                          className={`ml-auto ${
                            item === selected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

SelectInput.displayName = "Select input";

export default memo(SelectInput);
