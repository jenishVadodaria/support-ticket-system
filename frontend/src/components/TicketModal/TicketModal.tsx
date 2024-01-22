/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  IErrors,
  IFormState,
  Severity,
  TicketModalProps,
} from "../../Interfaces/TicketModal";
import axios from "axios";
import { toast } from "react-toastify";
import { constants } from "../../utils/constants";

const TicketModal = ({
  setCreateTicketModalShow,
  createTicketModalShow,
  setRefreshTableData,
  refreshTableData,
}: TicketModalProps) => {
  const [formState, setFormState] = useState<IFormState>({
    topic: "",
    description: "",
    severity: Severity.Low,
    type: "",
    resolvedOn: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [errors, setErrors] = useState<IErrors>({
    topic: "",
    description: "",
    severity: "",
    type: "",
  });
  const handleModal = () => {
    setCreateTicketModalShow(!createTicketModalShow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectDate(date);
    setFormState({
      ...formState,
      resolvedOn: date.toISOString(),
    });
  };

  const validateForm = () => {
    const newErrors: IErrors = {
      topic: "",
      description: "",
      severity: "",
      type: "",
    };

    if (!formState.topic) newErrors.topic = "Topic is required";
    if (!formState.description)
      newErrors.description = "Description is required";
    if (!Object.values(Severity).includes(formState.severity))
      newErrors.severity = "Severity must be Low, Medium, or High";
    if (!formState.type) newErrors.type = "Type is required";

    setErrors(newErrors);

    for (const key in newErrors) {
      if (newErrors[key as keyof IErrors]) return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response: any = await axios.post(
          `${constants.baseApiUrl}/support-tickets`,
          {
            topic: formState.topic,
            description: formState.description,
            severity: formState.severity,
            type: formState.type,
            resolvedOn: formState.resolvedOn,
          }
        );

        if (response.data.statusCode === 201) {
          toast.success("Ticket created successfully");
          handleModal();
          setRefreshTableData(!refreshTableData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error creating ticket. Please try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  const CustomDateInput = ({ value, onClick }: any) => (
    <div
      className="p-1 rounded-lg text-black border border-[#FF5A00] cursor-pointer"
      onClick={onClick}
    >
      {value}
    </div>
  );

  return (
    <>
      <Dialog
        open={createTicketModalShow}
        handler={handleModal}
        placeholder={""}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogHeader placeholder={""}>
          <div className="flex flex-row justify-between align-middle w-full">
            <div>Create Support Ticket :</div>
            <button className="cursor-pointer" onClick={handleModal}>
              <RxCross2 size={25} />
            </button>
          </div>
        </DialogHeader>
        <DialogBody placeholder={""}>
          <Card className="mx-auto w-full shadow-none" placeholder={""}>
            <CardBody placeholder={""}>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-4 justify-between align-middle mb-4 max-w-[400px]">
                  <div>
                    <Typography className="pb-1" variant="h6" placeholder={""}>
                      Topic :
                    </Typography>
                    <Input
                      label="Enter Topic"
                      size="lg"
                      crossOrigin={""}
                      type="text"
                      name="topic"
                      value={formState.topic}
                      onChange={handleChange}
                      className="max-w-[400px]"
                    />
                    {errors.topic && (
                      <p className="text-red-500">{errors.topic}</p>
                    )}
                  </div>
                  <div>
                    <Typography className="pb-1" variant="h6" placeholder={""}>
                      Description :
                    </Typography>
                    <Input
                      label="Enter Ticket Description"
                      size="lg"
                      crossOrigin={""}
                      type="text"
                      name="description"
                      value={formState.description}
                      onChange={handleChange}
                      className="max-w-[400px]"
                    />
                    {errors.description && (
                      <p className="text-red-500">{errors.description}</p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4 justify-between align-middle mb-6 max-w-[400px]">
                  <div>
                    <Typography className="pb-1" variant="h6" placeholder={""}>
                      Severity :
                    </Typography>
                    <Input
                      label="Enter Low, Medium or High"
                      size="lg"
                      crossOrigin={""}
                      type="text"
                      name="severity"
                      value={formState.severity}
                      onChange={handleChange}
                      className="max-w-[400px]"
                    />
                    {errors.severity && (
                      <p className="text-red-500">{errors.severity}</p>
                    )}
                  </div>
                  <div>
                    <Typography className="-pb-1" variant="h6" placeholder={""}>
                      Type :
                    </Typography>
                    <Input
                      label="Enter Ticket Type"
                      size="lg"
                      crossOrigin={""}
                      type="text"
                      name="type"
                      value={formState.type}
                      onChange={handleChange}
                      className="max-w-[400px]"
                    />
                    {errors.type && (
                      <p className="text-red-500">{errors.type}</p>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col justify-between align-middle max-w-[400px]">
                  <div className="w-full flex flex-row gap-3 items-center ">
                    <Typography className="pb-1" variant="h6" placeholder={""}>
                      Select Resolved On:
                    </Typography>
                    <DatePicker
                      selected={selectDate}
                      onChange={(date: Date) => handleDateChange(date)}
                      customInput={<CustomDateInput />}
                      name="resolvedOn"
                    />
                  </div>
                </div>
              </form>
            </CardBody>
            <CardFooter className="pt-0" placeholder={""}>
              <div className="w-full flex flex-row justify-center align-middle gap-4">
                <Button
                  className="rounded-lg text-black shadow-lg transition duration-200 hover:shadow-primary-hover hover:underline border border-[#FF5A00] bg-white"
                  onClick={handleModal}
                  size={"sm"}
                  placeholder={""}
                >
                  Close
                </Button>
                <Button
                  className="rounded-lg text-white shadow-lg transition duration-200 hover:shadow-primary-hover hover:underline bg-[#FF5A00]"
                  type="submit"
                  size={"sm"}
                  placeholder={""}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit
                </Button>
              </div>
            </CardFooter>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default TicketModal;
