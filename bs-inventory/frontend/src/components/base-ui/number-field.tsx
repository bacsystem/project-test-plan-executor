import * as React from "react";

import { FilledInput, FormLabel, Input } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import { cn } from "@/lib/utils";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

function SSRInitialFilled() {
  return null;
}
SSRInitialFilled.muiName = "Input";

export default function NumberField({
  id: idProp,
  label,
  error,
  variant = "outlined",
  size = "medium",
  formControlClassName,
  readOnly,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
  variant?: "filled" | "outlined" | "standard";
  formControlClassName?: string;
  readonly?: boolean;
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }

  return (
    <BaseNumberField.Root
      {...other}
      readOnly={readOnly}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant={variant}
          className={formControlClassName}
        >
          {variant === "standard" && <FormLabel component="label">{label}</FormLabel>}
          {props.children}
        </FormControl>
      )}
    >
      {variant === "outlined" && (
        <>
          <SSRInitialFilled {...other} />
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <BaseNumberField.Input
            id={id}
            render={(props, state) => (
              <OutlinedInput
                label={label}
                inputRef={props.ref}
                value={state.inputValue}
                onBlur={props.onBlur}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                onKeyDown={props.onKeyDown}
                onFocus={props.onFocus}
                slotProps={{
                  input: props,
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className="ms-0 flex max-h-[unset] flex-col self-stretch [&_button]:flex-1 [&_button]:py-0"
                  >
                    <BaseNumberField.Increment
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" className="py-0!" />}
                    >
                      <NiChevronUpSmall size={"small"} />
                    </BaseNumberField.Increment>

                    <BaseNumberField.Decrement
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Decrease" className="py-0!" />}
                    >
                      <NiChevronDownSmall size={"small"} />
                    </BaseNumberField.Decrement>
                  </InputAdornment>
                }
              />
            )}
          />
        </>
      )}
      {variant === "filled" && (
        <>
          <SSRInitialFilled {...other} />
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <BaseNumberField.Input
            id={id}
            render={(props, state) => (
              <FilledInput
                inputRef={props.ref}
                value={state.inputValue}
                onBlur={props.onBlur}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                onKeyDown={props.onKeyDown}
                onFocus={props.onFocus}
                slotProps={{
                  input: props,
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={cn("mt-0! flex flex-col items-center", size === "medium" && "mt-1!")}
                  >
                    <BaseNumberField.Increment
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" edge="end" className="mt-0! py-0.5!" />}
                    >
                      <NiChevronUpSmall size={"small"} />
                    </BaseNumberField.Increment>
                    <BaseNumberField.Decrement
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" edge="end" className="mt-0! py-0.5!" />}
                    >
                      <NiChevronDownSmall size={"small"} />
                    </BaseNumberField.Decrement>
                  </InputAdornment>
                }
              />
            )}
          />
        </>
      )}
      {variant === "standard" && (
        <>
          <SSRInitialFilled {...other} />
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <BaseNumberField.Input
            id={id}
            render={(props, state) => (
              <Input
                inputRef={props.ref}
                value={state.inputValue}
                onBlur={props.onBlur}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                onKeyDown={props.onKeyDown}
                onFocus={props.onFocus}
                slotProps={{
                  input: {
                    ...props,
                    className: cn(
                      props.className,
                      size === "medium" ? "py-2.5!" : "py-2!",
                      formControlClassName?.indexOf("outlined") !== -1 &&
                        size === "medium" &&
                        "py-[calc(.625rem-1px)]!",
                      formControlClassName?.indexOf("outlined") !== -1 && size === "small" && "py-[calc(.5rem-1px)]!",
                    ),
                  },
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className="ms-0 flex max-h-[unset] flex-col self-stretch [&_button]:flex-1 [&_button]:py-0"
                  >
                    <BaseNumberField.Increment
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" className="py-0!" />}
                    >
                      <NiChevronUpSmall size={"small"} />
                    </BaseNumberField.Increment>

                    <BaseNumberField.Decrement
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Decrease" className="py-0!" />}
                    >
                      <NiChevronDownSmall size={"small"} />
                    </BaseNumberField.Decrement>
                  </InputAdornment>
                }
              />
            )}
          />
        </>
      )}
    </BaseNumberField.Root>
  );
}
