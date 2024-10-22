import React, { useState } from "react";
import {
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text
} from "@sparrowengg/twigs-react";
import { CalendarIcon } from "@sparrowengg/twigs-react-icons";
import { parseDate, DateValue } from "@internationalized/date";
import dayjs from "dayjs";

const CustomDateMenu = ({
  onChangeHandler,
  value
}: {
  onChangeHandler: (value: DateValue) => void;
  value: string;
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [date, setDate] = useState<any>(
    value ?? parseDate(dayjs().format("YYYY-MM-DD"))
  );
  const formattedDateTime = dayjs(value).format('MM/DD/YYYY • HH:mm');
  return (
    <Popover open={popoverOpen} onOpenChange={(open) => setPopoverOpen(open)}>
      <PopoverTrigger asChild>
        <Input value={formattedDateTime} size="lg" readOnly rightIcon={<CalendarIcon />} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={3}
        css={{ width: 260, padding: 0, borderRadius: "$xl" }}
      >
        <Calendar
          size="md"
          footerActionText="Apply"
          value={date}
          onChange={setDate}
          showTimePicker
          footerAction={() => {
            onChangeHandler(date);
            setPopoverOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomDateMenu;
