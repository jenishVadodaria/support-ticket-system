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
import { RxCross2 } from "react-icons/rx";
import {
  AgentModalProps,
  IErrors,
  IFormData,
} from "../../Interfaces/AgentModal";
import { useState } from "react";
import axios from "axios";
import { constants } from "../../utils/constants";
import { toast } from "react-toastify";

const AgentModal = ({
  setCreateAgentModalShow,
  createAgentModalShow,
  setRefreshTableData,
  refreshTableData,
}: AgentModalProps) => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState<IErrors>({
    name: "",
    email: "",
    phone: "",
    description: "",
    emailRegex: "",
    phoneLength: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleModal = () => {
    setCreateAgentModalShow(!createAgentModalShow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateForm = () => {
    const newErrors: IErrors = {
      name: "",
      email: "",
      phone: "",
      description: "",
      emailRegex: "",
      phoneLength: "",
    };

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (
      (formData.phone && formData.phone.length < 10) ||
      formData.phone.length > 10
    )
      newErrors.phoneLength = "Phone number must be 10 digits";
    if (formData.email && !validateEmail(formData.email))
      newErrors.emailRegex = "Invalid email address";

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
          `${constants.baseApiUrl}/support-agents`,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            description: formData.description,
          }
        );

        if (response.data.statusCode === 201) {
          toast.success("Agent created successfully");
          handleModal();
          setRefreshTableData(!refreshTableData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error creating Agent. Please try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog
        open={createAgentModalShow}
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
            <div>Create Support Agent :</div>
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
                      Name:
                    </Typography>
                    <Input
                      label="Enter Agent name"
                      size="lg"
                      crossOrigin={""}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Typography className="-pb-4" variant="h6" placeholder={""}>
                      Email:
                    </Typography>
                    <Input
                      label="Enter Agent email"
                      size="lg"
                      crossOrigin={""}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                    {errors.emailRegex && (
                      <p className="text-red-500">{errors.emailRegex}</p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4 justify-between align-middle max-w-[400px]">
                  <div>
                    <Typography className="-pb-4" variant="h6" placeholder={""}>
                      Phone:
                    </Typography>
                    <Input
                      label="Enter Agent phone"
                      size="lg"
                      crossOrigin={""}
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone}</p>
                    )}
                    {errors.phoneLength && (
                      <p className="text-red-500">{errors.phoneLength}</p>
                    )}
                  </div>
                  <div>
                    <Typography className="-pb-4" variant="h6" placeholder={""}>
                      Description:
                    </Typography>
                    <Input
                      label="Enter Agent description"
                      size="lg"
                      crossOrigin={""}
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <p className="text-red-500">{errors.description}</p>
                    )}
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
                  onClick={handleSubmit}
                  type="submit"
                  size={"sm"}
                  placeholder={""}
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

export default AgentModal;
