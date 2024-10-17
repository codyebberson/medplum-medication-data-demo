import { MedplumClient } from "@medplum/core";
import { Medication } from "@medplum/fhirtypes";
import { writeFileSync } from "fs";

const medication: Medication = {
  resourceType: "Medication",
  id: "med0310",
  contained: [
    {
      resourceType: "Substance",
      id: "sub03",
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "55452001",
            display: "Oxycodone (substance)",
          },
        ],
      },
    },
  ],
  code: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "430127000",
        display: "Oral Form Oxycodone (product)",
      },
    ],
  },
  form: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "385055001",
        display: "Tablet dose form (qualifier value)",
      },
    ],
  },
  ingredient: [
    {
      itemReference: {
        reference: "#sub03",
      },
      strength: {
        numerator: {
          value: 5,
          system: "http://unitsofmeasure.org",
          code: "mg",
        },
        denominator: {
          value: 1,
          system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
          code: "TAB",
        },
      },
    },
  ],
};

// Write the Medication resource to the console
console.log(JSON.stringify(medication, null, 2));

// Write the Medication resource to a file
writeFileSync("medication.json", JSON.stringify(medication, null, 2));

// Create the Medication resource in Medplum
const medplum = new MedplumClient();
medplum.setBasicAuth("my_client_id", "my_client_secret");
medplum
  .createResource(medication)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
