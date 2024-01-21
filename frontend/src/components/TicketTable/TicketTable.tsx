/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { debounce } from "lodash";
import axios from "axios";
import { constants } from "../../utils/constants";
import Loader from "../Loader/Loader";
import NoData from "../NoData/NoData";
import { toast } from "react-toastify";
import { TicketData } from "../../Interfaces/TicketTable";

const TicketTable = ({ refreshTableData }: { refreshTableData: boolean }) => {
  const [ticketData, setTicketData] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const buildUrl = () => {
    let url = `${constants.baseApiUrl}/support-tickets?`;
    if (filterSeverity) url += `&severity=${filterSeverity}`;
    if (filterType) url += `&type=${filterType}`;
    if (filterAssignedTo) url += `&agentName=${filterAssignedTo}`;
    if (filterStatus) url += `&status=${filterStatus}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    if (sortOrder) url += `&sortOrder=${sortOrder}`;
    if (page) url += `&page=${page}`;
    if (limit) url += `&limit=${limit}`;
    return url;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(buildUrl());

      setTicketData(response.data.data.tickets);
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
  }, [
    limit,
    page,
    filterSeverity,
    sortBy,
    sortOrder,
    filterStatus,
    filterAssignedTo,
    filterType,
    refreshTableData,
  ]);

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

  const sortTable = (columnName: string) => {
    if (columnName === "Resolved-On") {
      setSortBy("resolvedOn");
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else if (columnName === "Date-Created") {
      setSortBy("dateCreated");
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    }
  };

  const handleFieldChange = (field: string) => {
    setSelectedField(field);
  };

  const handleFilterChange = useCallback(
    debounce((value: string) => {
      switch (selectedField) {
        case "Status":
          setFilterStatus(value);
          break;
        case "AssignedTo":
          setFilterAssignedTo(value);
          break;
        case "Severity":
          setFilterSeverity(value);
          break;
        case "Type":
          setFilterType(value);
          break;
        default:
          break;
      }
    }, 500),
    [selectedField]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedField) {
      setFilterValue(e.target.value);
      handleFilterChange(e.target.value);
    } else {
      toast.warn("Please select a field first");
    }
  };

  const handleAssignAgent = async (data: TicketData) => {
    try {
      if (data.agentName.length !== 0) {
        toast.warn("Agent already assigned");
        return;
      }

      const response: any = await axios.patch(
        `${constants.baseApiUrl}/support-tickets`,
        {
          id: data._id,
        }
      );

      if (response.data.statusCode === 200) {
        toast.success("Ticket assigned successfully");
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error assigning agent. Please try again later");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : ticketData.length > 0 || filterValue.length > 0 ? (
        <Card
          className="h-full w-full border border-black/10 shadow-none"
          placeholder={""}
        >
          <CardBody placeholder={""}>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col flex-wrap content-end">
                <div className="flex flex-row gap-3 justify-center align-middle ">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal px-1.5 py-1.5 text-xl font-bold"
                    placeholder={""}
                  >
                    Filter:{""}
                  </Typography>
                  <Menu
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    <MenuHandler>
                      <button className="relative rounded-lg px-1.5 py-1.5 text-white  bg-[#FF5A00] w-[50%]">
                        {selectedField ? selectedField : "Select Field"}
                      </button>
                    </MenuHandler>
                    <MenuList placeholder={""}>
                      <MenuItem
                        placeholder={""}
                        onClick={() => handleFieldChange("Status")}
                      >
                        Status
                      </MenuItem>
                      <MenuItem
                        placeholder={""}
                        onClick={() => handleFieldChange("AssignedTo")}
                      >
                        Assigned-To
                      </MenuItem>
                      <MenuItem
                        placeholder={""}
                        onClick={() => handleFieldChange("Severity")}
                      >
                        Severity
                      </MenuItem>
                      <MenuItem
                        placeholder={""}
                        onClick={() => handleFieldChange("Type")}
                      >
                        Type
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Input
                    crossOrigin={""}
                    label="Enter Filter Value"
                    type="text"
                    value={filterValue}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div>
                <table className="w-full table-auto text-left">
                  <thead>
                    <tr>
                      {constants.ticketTableHeaderData.map((head, index) => (
                        <th
                          key={index}
                          className={`cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex flex-row justify-center align-middle gap-2 font-normal leading-none opacity-70"
                            placeholder={""}
                            onClick={() => sortTable(head)}
                          >
                            {head}
                            {(head === "Date-Created" ||
                              head === "Resolved-On") && (
                              <HiChevronUpDown
                                strokeWidth={2}
                                className={`h-4 w-4`}
                              />
                            )}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.map((data, index) => (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.topic}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.description}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.severity}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.type}
                          </Typography>
                        </td>

                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.status}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.dateCreated}
                          </Typography>
                        </td>

                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.resolvedOn ? data.resolvedOn : "-"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                            placeholder={""}
                          >
                            {data.agentName ? data.agentName : "-"}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <button
                            className="relative rounded-lg px-1.5 py-1.5 text-white  bg-[#FF5A00] w-[80%]"
                            onClick={() => handleAssignAgent(data)}
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium text-center text-white"
                              placeholder={""}
                            >
                              Assign
                            </Typography>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
              {`Page : ${page}`}
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
        <NoData textValue={"Ticket Data Not Available!"} />
      )}
    </>
  );
};

export default TicketTable;
