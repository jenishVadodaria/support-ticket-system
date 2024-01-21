import { Typography } from "@material-tailwind/react";
import NoDataLogo from ".././../assets/undraw_no_data.svg";

const NoData = ({ textValue }: { textValue: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="relative w-full max-w-xl rounded-2xl"
        src={NoDataLogo}
        alt="No data"
      />
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal text-lg text-center pt-4"
        placeholder={""}
      >
        {" "}
        {textValue}
      </Typography>
    </div>
  );
};

export default NoData;
