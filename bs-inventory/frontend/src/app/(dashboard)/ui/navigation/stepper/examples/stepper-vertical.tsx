import * as React from "react";

import { StepIconProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "step-horizontal-line-1",
    label: "Settings",
    caption: "Step 1",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    icon: "NiKnobs",
  },
  {
    id: "step-horizontal-line-2",
    label: "Grouping",
    caption: "Step 2",
    description: "An ad group contains one or more ads which target a shared set of keywords.",
    icon: "NiDuplicate",
  },
  {
    id: "step-horizontal-line-3",
    label: "Create",
    caption: "Step 3",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    icon: "NiTag",
  },
];

export default function StepperVertical() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className="max-w-96">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.id}>
            <StepLabel
              slots={{
                stepIcon: (props: StepIconProps) => {
                  const { active, completed } = props;
                  return (
                    <Box
                      className={cn(
                        "h-8 w-8 rounded-sm border border-solid p-[calc(0.5rem-1px)]",
                        completed ? "border-primary text-primary bg-transparent" : "border-grey-200 text-text-primary",
                        active && "border-primary bg-primary text-text-contrast",
                      )}
                    >
                      <NextureIcons icon={step.icon as IconName} size={"small"} />
                    </Box>
                  );
                },
              }}
              optional={<Typography variant="caption">{step.caption}</Typography>}
            >
              {step.label}
            </StepLabel>
            <StepContent className="ps-7">
              <Typography>{step.description}</Typography>
              <Box className="mt-2">
                <Button variant="contained" onClick={handleNext} className="me-1 mt-1">
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  variant="contained"
                  color="grey"
                  disabled={index === 0}
                  onClick={handleBack}
                  className="me-1 mt-1"
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className="ps-10">
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button variant="contained" color="grey" onClick={handleReset} className="me-1 mt-1">
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
