import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  options: { name: string; value: string }[];
}

const CustomSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
}: CustomSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item flex-1">
          <FormLabel className="text-gray-700">{label}</FormLabel>

          <div className="flex w-full flex-col">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-[14px] w-full py-5.5 rounded-lg border">
                  <SelectValue
                    placeholder={placeholder}
                    className="text-[14px] text-gray-900"
                  />
                </SelectTrigger>
              </FormControl>

              <SelectContent className="bg-white text-[14px]">
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-[14px]"
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomSelect;
