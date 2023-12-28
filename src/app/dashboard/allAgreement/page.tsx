import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
} from "@tremor/react";

const AllAgreement = () => {
  return (
    <div className="p-4 box-border h-[80vh]">
      <AccordionList className="w-full">
        <Accordion>
          <AccordionHeader>Accordion 1</AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            tempor lorem non est congue blandit. Praesent non lorem sodales,
            suscipit est sed, hendrerit dolor.
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>Accordion 2</AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            tempor lorem non est congue blandit. Praesent non lorem sodales,
            suscipit est sed, hendrerit dolor.
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>Accordion 3</AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            tempor lorem non est congue blandit. Praesent non lorem sodales,
            suscipit est sed, hendrerit dolor.
          </AccordionBody>
        </Accordion>
      </AccordionList>
    </div>
  );
};

export default AllAgreement;
