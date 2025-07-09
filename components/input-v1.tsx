"use client";
import * as React from "react";
import { Input, InputInfo, InputInfoProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputV1Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    React.ComponentPropsWithRef<"input">,
    InputInfoProps {
  label: string;
  labelClassName?: string;
  requiredStar?: boolean;
  rootClassName?: string;
  defaultValue?: string | number;
  rightElement?: React.ReactNode;
}

export const inputFocusLabelClassName =
  "peer-focus-visible:top-0 peer-focus-visible:mt-0 peer-focus-visible:-translate-y-[calc(50%+2px)] peer-focus-visible:ml-2 peer-focus-visible:px-1 peer-focus-visible:pr-2 peer-focus-visible:bg-background peer-focus-visible:h-max peer-focus-visible:w-max peer-focus-visible:text-ring";
export const inputPlaceholdernotshownLabelClassName =
  "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:mt-0 peer-[:not(:placeholder-shown)]:-translate-y-[calc(50%+2px)] peer-[:not(:placeholder-shown)]:ml-2 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:pr-2 peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:h-max peer-[:not(:placeholder-shown)]:w-max peer-[:not(:placeholder-shown)] ";
export const inputActive =
  "top-0 mt-0 -translate-y-[calc(50%+2px)] ml-2 px-1 pr-2 bg-background h-max w-max";

const InputV1 = React.forwardRef<HTMLInputElement, InputV1Props>(
  (
    {
      className,
      rootClassName,
      type,
      label,
      requiredStar,
      labelClassName,
      warn,
      error,
      info,
      defaultValue,
      onChange,
      rightElement,
      children,
      value: controlledValue,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const [internalValue, setInternalValue] = React.useState<string | number>(
      ""
    );

    // Determine if this is a controlled or uncontrolled component
    const isControlled = controlledValue !== undefined;
    const inputValue = isControlled ? controlledValue : internalValue;

    // Check if input has content for label positioning
    const hasContent =
      inputValue != null &&
      inputValue !== "" &&
      String(inputValue).trim() !== "";

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange && onChange(e);
    };

    // Initialize internal value with defaultValue only once
    React.useEffect(() => {
      if (!isControlled && defaultValue !== undefined) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);

    return (
      <div className={cn(" w-full", rootClassName)}>
        <div className={cn("relative  ")}>
          <Input
            id={id}
            type={type}
            className={cn(
              "peer placeholder:opacity-0 focus-visible:placeholder:opacity-100 focus-visible:placeholder:visible transition placeholder-shown:text-ellipsis",
              (error || warn) && "border-2",
              error && "[--ring:var(--destructive)] border-destructive",
              warn && "[--ring:var(--warn)]  border-warn",
              rightElement && "pr-10",
              className
            )}
            value={inputValue}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={onInputChange}
            {...props}
            ref={ref}
          />
          <Label
            onClick={(e) => {
              e.stopPropagation();
            }}
            htmlFor={id}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 px-3 h-max transition-all ease-out duration-200 pointer-events-none ",
              hasContent && inputActive,
              inputFocusLabelClassName,
              props.placeholder && inputPlaceholdernotshownLabelClassName,
              error && " !text-destructive",
              warn && " !text-warn",
              labelClassName
            )}
          >
            {label}
            {requiredStar && props.required && " *"}
          </Label>
          {children}
          {rightElement ? (
            <div className="absolute right-3 inset-y-0 flex justify-center items-center text-primary">
              {rightElement}
            </div>
          ) : null}
        </div>
        <InputInfo info={info} warn={warn} error={error} />
      </div>
    );
  }
);

InputV1.displayName = "InputV1";
export default InputV1;
