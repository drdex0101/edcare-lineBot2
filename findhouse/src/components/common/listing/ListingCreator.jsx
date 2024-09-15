import Image from "next/image";
import agentsTeam from "../../../data/agents";
const Creaator = ({ data }) => {
  const matchedAgent = agentsTeam.find(agent => agent.name === data.staff) || agentsTeam.find(agent => agent.name === '劉宸瑜');

  return (
    <div className="media d-flex">
      <Image
        width={90}
        height={90}
        className="me-3"
        src={matchedAgent.img}
        alt={matchedAgent.name}
      />
      <div className="media-body">
        <h5 className="mt-0 mb0">{matchedAgent.name}</h5>
        <p className="mb0">{matchedAgent.mobile}</p>
        <p className="mb0">{matchedAgent.email}</p>
        <a className="text-thm" href={matchedAgent.line}>
          加我Line
        </a>
      </div>
    </div>
  );
};

export default Creaator;
