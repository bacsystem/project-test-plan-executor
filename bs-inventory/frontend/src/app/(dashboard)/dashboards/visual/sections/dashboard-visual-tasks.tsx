import { useState } from "react";

import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";

import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiSquircle from "@/icons/nexture/ni-squircle";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  label: string;
  time: string;
  checked: boolean;
}

export default function DashboardVisualTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      label: "Create wireframes",
      time: "09:00",
      checked: true,
    },
    {
      id: "task-2",
      label: "Meeting with the team",
      time: "11:00",
      checked: true,
    },
    {
      id: "task-3",
      label: "Pen testing",
      time: "12:00",
      checked: true,
    },
    {
      id: "task-4",
      label: "Lunch with the new clients",
      time: "13:00",
      checked: false,
    },
    {
      id: "task-5",
      label: "Afternoon nap",
      time: "14:00",
      checked: false,
    },
    {
      id: "task-6",
      label: "Working on the FE tests",
      time: "15:00",
      checked: false,
    },
    {
      id: "task-7",
      label: "Meeting with the management",
      time: "17:00",
      checked: false,
    },
    {
      id: "task-8",
      label: "Gym",
      time: "20:00",
      checked: false,
    },
    {
      id: "task-9",
      label: "Language class",
      time: "22:00",
      checked: false,
    },
    {
      id: "task-10",
      label: "Movie",
      time: "23:00",
      checked: false,
    },
  ]);

  const handleCheckChange = (checked: boolean, id: string) => {
    const nextTasks: Task[] = tasks.map((task) => {
      if (id === task.id) {
        task.checked = checked;
      }
      return task;
    });

    setTasks(nextTasks);
  };

  return (
    <Box>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Tasks
      </Typography>
      <Card>
        <CardContent>
          <Box className="flex h-100 flex-col items-start overflow-auto">
            {tasks.map((task) => {
              return (
                <FormControl key={task.id} className="group">
                  <FormControlLabel
                    checked={task.checked}
                    className="items-start"
                    control={
                      <Checkbox
                        icon={<NiSquircle size={"large"} className="text-text-disabled! group-hover:text-primary!" />}
                        checkedIcon={<NiCheckSquare size={"large"} />}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          handleCheckChange(event.target.checked, task.id);
                        }}
                      />
                    }
                    label={
                      <Box className="flex flex-col">
                        <Typography variant="body1" className={cn(task.checked && "line-through")}>
                          {task.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={cn("text-text-secondary", task.checked && "line-through")}
                        >
                          {task.time}
                        </Typography>
                      </Box>
                    }
                  />
                </FormControl>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
