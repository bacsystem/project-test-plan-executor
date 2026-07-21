import * as React from "react";

import { StepIconProps, StepLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import NiCheck from "@/icons/nexture/ni-check";
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

export default function StepperHorizontalNonLinear() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box className="w-full">
      <Stepper nonLinear activeStep={activeStep} className="px-4">
        {steps.map((step, index) => {
          return (
            <Step key={step.id} completed={completed[index]}>
              <StepButton
                color="inherit"
                className="text-left"
                onClick={handleStep(index)}
                optional={
                  <Typography variant="caption" className="leading-3">
                    {step.caption}
                  </Typography>
                }
              >
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
                >
                  {step.label}
                </StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography className="mt-4 mb-2">All steps completed - you&apos;re finished</Typography>
            <Box className="flex flex-row pt-2">
              <Box className="flex flex-1" />
              <Button onClick={handleReset}>Reset</Button>
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
              <Button
                className="ms-1"
                color="grey"
                variant="contained"
                onClick={handleNext}
                endIcon={<NiChevronRightSmall size={"medium"} className="rtl:rotate-180" />}
              >
                Next
              </Button>
              <Box className="flex flex-1" />

              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="body1" className="inline-block">
                    Step {activeStep + 1} already completed!
                  </Typography>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleComplete}
                    startIcon={<NiCheck size={"medium"} />}
                  >
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
