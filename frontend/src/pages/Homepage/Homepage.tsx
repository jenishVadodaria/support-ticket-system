import { toast } from "react-toastify";
import HomepageLogo from "../../assets/undraw_in_sync_homepage.svg";
import axios from "axios";
import { constants } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [totalAgentCount, setTotalAgentCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const title = "Support Ticket Entry System";

  const description =
    "Find your agent and create a ticket. Please create an agent first to assign it to your tickets";

  const fetchTotalAgentCount = async () => {
    try {
      const response = await axios.get(
        `${constants.baseApiUrl}/support-agents`
      );

      if (response.data.statusCode === 200) {
        setTotalAgentCount(response.data.data.totalCount);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTotalAgentCount();
  }, []);

  return (
    <div className="mt-16 flex flex-col items-center gap-16 px-4 lg:mt-32 lg:gap-32">
      <div className="space-y-8">
        <h1 className="mx-auto  text-center text-3xl font-bold md:text-5xl">
          {title}
        </h1>
        <h2 className="mx-auto max-w-2xl text-center text-xl md:text-xl">
          {description}
        </h2>
        <div className="flex justify-center">
          <Link to={totalAgentCount > 0 ? "/tickets" : "/agents"}>
            <button className="relative rounded-lg bg-[#ff5a00] px-2 py-2 text-white">
              {/* {totalAgentCount > 0 ? "Create Ticket" : "Create Agent"} */}
              {loading
                ? "Loading..."
                : totalAgentCount > 0
                ? "Create Ticket"
                : "Create Agent"}
            </button>
          </Link>
        </div>
      </div>
      <div className="relative">
        <img
          className="relative w-full max-w-4xl rounded-2xl"
          src={HomepageLogo}
          alt="Homepage"
        />
      </div>
    </div>
  );
};

export default Homepage;
