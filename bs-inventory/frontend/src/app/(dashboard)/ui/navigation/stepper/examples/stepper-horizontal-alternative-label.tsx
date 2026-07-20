import * as React from "react";

import { StepIconProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "step-horizontal-line-1",
    label: "Settings",
    caption: "Step 1",
    icon: "NiKnobs",
  },
  {
    id: "step-horizontal-line-2",
    label: "Grouping",
    caption: "Step 2",
    icon: "NiDuplicate",
  },
  {
    id: "step-horizontal-line-3",
    label: "Create",
    caption: "Step 3",
    icon: "NiTag",
  },
];

export default function StepperHorizontalAlternativeLabel() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => {
          return (
            <Step key={step.id}>
              <StepLabel
                slots={{
                  stepIcon: (props: StepIconProps) => {
                    const { active, completed } = props;
                    return (
                      <Box
                        className={cn(
                          "h-8 w-8 rounded-sm border border-solid p-[calc(0.5rem-1px)]",
                          completed
                            ? "border-primary text-primary bg-transparent"
                            : "border-grey-200 text-text-primary",
                          active && "border-primary bg-primary text-text-contrast",
                        )}
                      >
                        <NextureIcons icon={step.icon as IconName} size={"small"} />
                      </Box>
                    );
                  },
                }}
                optional={
                  <Typography variant="caption" className="leading-3">
                    {step.caption}
                  </Typography>
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography className="mt-4 mb-2">All steps completed - you&apos;re finished</Typography>
          <Box className="flex flex-row pt-2">
            <Box className="flex flex-1" />
            <Button color="grey" variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography className="mt-4 mb-2">Step {activeStep + 1}</Typography>
          <Box className="flex flex-row pt-2">
            <Button
              color="grey"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              className="me-1"
              startIcon={<NiChevronLeftSmall size={"medium"} className="rtl:rotate-180" />}
            >
              Back
            </Button>
            <Box className="flex flex-1" />
            {isStepOptional(activeStep) && (
              <Button onClick={handleSkip} className="me-1">
                Skip
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={handleNext}
              endIcon={<NiChevronRightSmall size={"medium"} className="rtl:rotate-180" />}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
