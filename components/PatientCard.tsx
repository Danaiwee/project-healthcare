import { calculateAge, formatBirthDate, formatHN } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { IUserDoc } from "@/database/user.model";

interface PatientCardProps {
  patient: IUserDoc;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const {
    _id,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    phone,
    email,
    address,
    language,
    nationality,
    emergencyContact,
    religion,
    hn,
  } = patient;

  const id = _id.toString();
  const formattedHnNumber = formatHN(hn);

  return (
    <Accordion type="single" collapsible className="patient-card">
      <AccordionItem value={id} className="border px-4 rounded-lg">
        <AccordionTrigger>
          <div className="patient-card_trigger">
            <div className="flex-1 flex gap-1">
              <h3 className="patient-card_trigger-header">HN: </h3>
              <p className="patient-card_trigger-content">
                {formattedHnNumber}
              </p>
            </div>

            <div className="flex-2 flex gap-1">
              <h3 className="patient-card_trigger-header">Name: </h3>
              <p className="patient-card_trigger-content">
                {`${firstName} ${middleName} ${lastName}`}
              </p>
            </div>

            <div className="flex-1 flex gap-1 sm:justify-end">
              <h3 className="patient-card_trigger-header">Age: </h3>
              <p className="patient-card_trigger-content">
                {calculateAge(dateOfBirth)}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-3">
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="patient-card_content">
              {/*Date of Birth and Gender*/}
              <div className="flex-1 flex gap-2">
                <h3 className="patient-card_content-header">Date Of Birth: </h3>
                <p className="patient-card_content-upper">
                  {formatBirthDate(dateOfBirth)}
                </p>
              </div>
              <div className="flex-1 flex gap-2">
                <h3 className="patient-card_content-header">Gender: </h3>
                <p className="patient-card_content-upper">{gender}</p>
              </div>
            </div>

            {/*Email and Phone*/}
            <div className="patient-card_content">
              <div className="flex-1 flex gap-2">
                <h3 className="patient-card_content-header">Email: </h3>
                <p className="patient-card_content-lower">{email}</p>
              </div>
              <div className="flex-1 flex gap-2">
                <h3 className="patient-card_content-header">Phone Number: </h3>
                <p className="patient-card_content-lower">{phone}</p>
              </div>
            </div>

            {/*Address*/}
            <div className="flex-1 flex gap-2">
              <h3 className="patient-card_content-header">Address: </h3>
              <p className="patient-card_content-lower">{address}</p>
            </div>

            {/*Language and Nationality*/}
            <div className="patient-card_content">
              <div className="flex-1 flex gap-2">
                <h3 className="patient-card_content-header">
                  Preferred Language:{" "}
                </h3>
                <p className="patient-card_content-upper">{language}</p>
              </div>
              <div className="flex-1 flex gap-2">
                <h3 className="patient-card_content-header">Nationality: </h3>
                <p className="patient-card_content-lower">{nationality}</p>
              </div>
            </div>

            {/*Emergency Contact*/}
            <div className="flex-1 flex gap-2">
              <h3 className="patient-card_content-header">
                Emergency Contact:{" "}
              </h3>
              <p className="patient-card_content-lower">{emergencyContact}</p>
            </div>

            {/*Religion*/}
            <div className="flex-1 flex gap-2">
              <h3 className="patient-card_content-header">Religion: </h3>
              <p className="patient-card_content-lower">{religion}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PatientCard;
