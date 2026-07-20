import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function PremiumPlansFaq() {
  return (
    <Grid container size={12}>
      <Grid size={12}>
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Frequently Asked Questions
        </Typography>
        <Box className="bg-background-paper outline-grey-50 mb-2.5 rounded-3xl outline">
          <Accordion className="bg-transparent" defaultExpanded>
            <AccordionSummary className="group">
              <Card className="w-full shadow-none outline-none">
                <CardContent className="flex flex-row justify-between">
                  <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                    What does an AI chat application do?
                  </Typography>
                  <NiChevronRightSmall size={20} className="accordion-rotate group-hover:text-primary transition-all" />
                </CardContent>
              </Card>
            </AccordionSummary>
            <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
              <Typography variant="body1">
                It simulates human-like conversations using natural language processing and machine learning. These
                applications are designed to interpret user input, understand context, and generate relevant responses.
              </Typography>
              <br />
              <Typography variant="body1">
                They can assist with a wide range of tasks such as answering questions, providing recommendations,
                automating customer service, and even generating creative content like stories or emails. Their
                capabilities continue to evolve as they are trained on larger datasets and improved algorithms.
              </Typography>
              <ul className="list-inside list-disc">
                <li>Answering questions and providing information</li>
                <li>Offering personalized recommendations</li>
                <li>Automating customer service interactions</li>
                <li>Generating creative content (e.g., stories, emails)</li>
                <li>Assisting with scheduling and task management</li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="bg-background-paper outline-grey-50 mb-2.5 rounded-3xl outline">
          <Accordion className="bg-transparent">
            <AccordionSummary className="group">
              <Card className="w-full shadow-none outline-none">
                <CardContent className="flex flex-row justify-between">
                  <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                    Can it understand multiple languages or dialects?
                  </Typography>
                  <NiChevronRightSmall size={20} className="accordion-rotate group-hover:text-primary transition-all" />
                </CardContent>
              </Card>
            </AccordionSummary>
            <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
              <Typography variant="body1">
                Their capabilities continue to evolve as they are trained on larger datasets and improved algorithms.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="bg-background-paper outline-grey-50 mb-2.5 rounded-3xl outline">
          <Accordion className="bg-transparent">
            <AccordionSummary className="group">
              <Card className="w-full shadow-none outline-none">
                <CardContent className="flex flex-row justify-between">
                  <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                    Where can I install or use the chatbot?
                  </Typography>
                  <NiChevronRightSmall size={20} className="accordion-rotate group-hover:text-primary transition-all" />
                </CardContent>
              </Card>
            </AccordionSummary>
            <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
              <Typography variant="body1">
                Their capabilities continue to evolve as they are trained on larger datasets and improved algorithms.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box className="bg-background-paper outline-grey-50 mb-2.5 rounded-3xl outline">
          <Accordion className="bg-transparent">
            <AccordionSummary className="group">
              <Card className="w-full shadow-none outline-none">
                <CardContent className="flex flex-row justify-between">
                  <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                    Can it be connected to my CRM or other business tools?
                  </Typography>
                  <NiChevronRightSmall size={20} className="accordion-rotate group-hover:text-primary transition-all" />
                </CardContent>
              </Card>
            </AccordionSummary>
            <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
              <Typography variant="body1">
                Their capabilities continue to evolve as they are trained on larger datasets and improved algorithms.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="bg-background-paper outline-grey-50 mb-2.5 rounded-3xl outline">
          <Accordion className="bg-transparent">
            <AccordionSummary className="group">
              <Card className="w-full shadow-none outline-none">
                <CardContent className="flex flex-row justify-between">
                  <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                    Does the chatbot collect personal data?
                  </Typography>
                  <NiChevronRightSmall size={20} className="accordion-rotate group-hover:text-primary transition-all" />
                </CardContent>
              </Card>
            </AccordionSummary>
            <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
              <Typography variant="body1">
                Their capabilities continue to evolve as they are trained on larger datasets and improved algorithms.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className="bg-background-paper outline-grey-50 mb-2.5 rounded-3xl outline">
          <Accordion className="bg-transparent">
            <AccordionSummary className="group">
              <Card className="w-full shadow-none outline-none">
                <CardContent className="flex flex-row justify-between">
                  <Typography variant="h6" component="h6" className="group-hover:text-primary mb-0 transition-colors">
                    What happens if the chatbot doesn't know the answer?
                  </Typography>
                  <NiChevronRightSmall size={20} className="accordion-rotate group-hover:text-primary transition-all" />
                </CardContent>
              </Card>
            </AccordionSummary>
            <AccordionDetails className="bg-transparent px-7 py-6 pt-0">
              <Typography variant="body1">
                Their capabilities continue to evolve as they are trained on larger datasets and improved algorithms.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </Grid>
  );
}
