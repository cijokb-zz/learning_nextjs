import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";

const Person = ({ ownersList }) => {
  const {query} = useRouter();
  const [owners, setOwners] = useState([ownersList]);
  // the useEffect runs in the client not in the sever as the server renders the content and then immediatley sends to the client
  useEffect(() => {
    async function loadData() {
      const response = await fetch("http://localhost:4001/vehicles?ownerName=" + query.person + "&vehicle=" + query.vehicle);
      const data  = await response.json();
      setOwners(data);
    }
    ownersList.length === 0 && loadData();
  }, []);
  return (
    <div>
      {query.vehicle}/{query.person}
      <pre>{owners[0]?.details}</pre>
    </div>
  );
};

Person.getInitialProps = async (ctx) => {
  console.log("*****getInitilaprops****", ctx);
  //req and res object will be undefined in the client side
  if (!ctx.req) {
    return { ownersList: [] };
  }

  const {
    query: { person, vehicle },
  } = ctx;
  const response = await fetch(
    "http://localhost:4001/vehicles?ownerName=" + person + "&vehicle=" + vehicle
  );
  const data = await response.json();
  return { ownersList: data };
};
export default Person;
