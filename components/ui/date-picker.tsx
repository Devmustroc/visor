'use client'

import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'lucide-react';
import {SelectSingleEventHandler} from "react-day-picker";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
}


const DatePicker = ({
                        value,
                        onChange,
                        disabled,

    }: Props) => {
    return (
        <Popover
            modal={true}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Select date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    className="rounded-md border"
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;