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
    <Accordion
      type="single"
      collapsible
      className="w-full border-b border-gray-100"
    >
      <AccordionItem value={id} className="border px-4 rounded-lg">
        <AccordionTrigger>
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between pz-10">
            <div className="flex-1 flex gap-1">
              <h3 className="text-gray-700 font-semibold text-md">HN: </h3>
              <p className="text-gray-500 font-semibold text-md uppercase">
                {formattedHnNumber}
              </p>
            </div>

            <div className="flex-2 flex gap-1">
              <h3 className="text-gray-700 font-semibold text-md">Name: </h3>
              <p className="text-gray-500 font-semibold text-md uppercase">
                {`${firstName} ${middleName} ${lastName}`}
              </p>
            </div>

            <div className="flex-1 flex gap-1 sm:justify-end">
              <h3 className="text-gray-700 font-semibold text-md">Age: </h3>
              <p className="text-gray-500 font-semibold text-md uppercase">
                {calculateAge(dateOfBirth)}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-3">
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              {/*Date of Birth and Gender*/}
              <div className="flex-1 flex gap-2">
                <h3 className="text-gray-700 font-semibold text-md">
                  Date Of Birth:{" "}
                </h3>
                <p className="text-gray-500 font-semibold text-md uppercase">
                  {formatBirthDate(dateOfBirth)}
                </p>
              </div>
              <div className="flex-1 flex gap-2">
                <h3 className="text-gray-700 font-semibold text-md">
                  Gender:{" "}
                </h3>
                <p className="text-gray-500 font-semibold text-md uppercase">
                  {gender}
                </p>
              </div>
            </div>

            {/*Email and Phone*/}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex-1 flex gap-2">
                <h3 className="text-gray-700 font-semibold text-md">Email: </h3>
                <p className="text-gray-500 font-semibold text-md">{email}</p>
              </div>
              <div className="flex-1 flex gap-2">
                <h3 className="text-gray-700 font-semibold text-md">
                  Phone Number:{" "}
                </h3>
                <p className="text-gray-500 font-semibold text-md">{phone}</p>
              </div>
            </div>

            {/*Address*/}
            <div className="flex-1 flex gap-2">
              <h3 className="text-gray-700 font-semibold text-md">Address: </h3>
              <p className="text-gray-500 font-semibold text-md">{address}</p>
            </div>

            {/*Language and Nationality*/}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex-1 flex gap-2">
                <h3 className="text-gray-700 font-semibold text-md">
                  Preferred Language:{" "}
                </h3>
                <p className="text-gray-500 font-semibold text-md uppercase">
                  {language}
                </p>
              </div>
              <div className="flex-1 flex gap-2">
                <h3 className="text-gray-700 font-semibold text-md">
                  Nationality:{" "}
                </h3>
                <p className="text-gray-500 font-semibold text-md">
                  {nationality}
                </p>
              </div>
            </div>

            {/*Emergency Contact*/}
            <div className="flex-1 flex gap-2">
              <h3 className="text-gray-700 font-semibold text-md">
                Emergency Contact:{" "}
              </h3>
              <p className="text-gray-500 font-semibold text-md">
                {emergencyContact}
              </p>
            </div>

            {/*Religion*/}
            <div className="flex-1 flex gap-2">
              <h3 className="text-gray-700 font-semibold text-md">
                Religion:{" "}
              </h3>
              <p className="text-gray-500 font-semibold text-md">{religion}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PatientCard;
