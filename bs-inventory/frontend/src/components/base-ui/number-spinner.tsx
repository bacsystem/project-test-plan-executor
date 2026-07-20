import * as React from "react";

import { FilledInput, FormLabel, Input } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import NiMinus from "@/icons/nexture/ni-minus";
import NiPlus from "@/icons/nexture/ni-plus";
import { cn } from "@/lib/utils";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

function SSRInitialFilled() {
  return null;
}
SSRInitialFilled.muiName = "Input";

export default function NumberSpinner({
  id: idProp,
  label,
  error,
  variant = "outlined",
  size = "medium",
  formControlClassName,
  readOnly,
  centered,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
  variant?: "filled" | "outlined" | "standard";
  formControlClassName?: string;
  readonly?: boolean;
  centered?: boolean;
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
                  input: { ...props, className: cn(props.className, centered && "text-center") },
                }}
                startAdornment={
                  <InputAdornment position="start" className="-ms-2!">
                    <BaseNumberField.Decrement
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Decrease" />}
                    >
                      <NiMinus size={"small"} />
                    </BaseNumberField.Decrement>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <BaseNumberField.Increment
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" />}
                    >
                      <NiPlus size={"small"} />
                    </BaseNumberField.Increment>
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
                  input: { ...props, className: cn(props.className, centered && "text-center") },
                }}
                startAdornment={
                  <InputAdornment position="start" className="-ms-2 mt-3">
                    <BaseNumberField.Decrement
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" className="mt-0" />}
                    >
                      <NiMinus size={"small"} />
                    </BaseNumberField.Decrement>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end" className="mt-3">
                    <BaseNumberField.Increment
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" className="mt-0" />}
                    >
                      <NiPlus size={"small"} />
                    </BaseNumberField.Increment>
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
                startAdornment={
                  <InputAdornment position="start">
                    <BaseNumberField.Decrement
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Decrease" />}
                    >
                      <NiMinus size={"small"} />
                    </BaseNumberField.Decrement>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <BaseNumberField.Increment
                      disabled={readOnly}
                      render={<IconButton size={"tiny"} aria-label="Increase" />}
                    >
                      <NiPlus size={"small"} />
                    </BaseNumberField.Increment>
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
