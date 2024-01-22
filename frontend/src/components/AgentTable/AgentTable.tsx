/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AgentData } from "../../Interfaces/AgentTable";
import { constants } from "../../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import NoData from "../NoData/NoData";

const AgentTable = ({ refreshTableData }: { refreshTableData: boolean }) => {
  const [agentData, setAgentData] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);

  const buildUrl = () => {
    let url = `${constants.baseApiUrl}/support-agents?`;
    if (page) url += `&page=${page}`;
    if (limit) url += `&limit=${limit}`;
    return url;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(buildUrl());

      setAgentData(response.data.data.agents);
      setTotalPages(Math.ceil(response.data.data.totalCount / 10));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, page, refreshTableData]);

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : agentData.length > 0 ? (
        <Card
          className="h-full w-full border border-black/10 shadow-none"
          placeholder={""}
        >
          <CardBody placeholder={""} className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {constants.agentTableHeaderData.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        placeholder={""}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agentData.map((data, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={""}
                      >
                        {data.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={""}
                      >
                        {data.email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={""}
                      >
                        {data.phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={""}
                      >
                        {data.description}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={""}
                      >
                        {data.dateCreated}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={""}
                      >
                        {data.active === true ? "Active" : "Inactive"}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
          <CardFooter
            className="flex items-center justify-between border-t border-blue-gray-50 p-4"
            placeholder={""}
          >
            <Button
              variant="outlined"
              size="sm"
              placeholder={""}
              onClick={handlePrev}
              disabled={page === 0}
            >
              Previous
            </Button>

            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal text-center"
              placeholder={""}
            >
              {`Page : ${page + 1} of ${totalPages}`}
            </Typography>

            <Button
              variant="outlined"
              size="sm"
              placeholder={""}
              onClick={handleNext}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <NoData textValue={"Agent Data Not Available!"} />
      )}
    </>
  );
};

export default AgentTable;
