import Link from "next/link";
import fetch from 'isomorphic-unfetch';

export const List = (props) => {
  // console.log(props);
  // const [owners, setOwners] = useState([]);
  // the useEffect runs in the client not in the sever as the server renders the content and then immediatley sends to the client
  // useEffect(() => {
  //   async function loadData() {
  //     const response = await fetch("https://reqres.in/api/users?page=2");
  //     const { data } = await response.json();
  //     data.map((item) => (item["vehicle"] = "car"));
  //     setOwners(data);
  //   }
  //   loadData();
  // }, []);
  return (
    <div>
      {props.owners.map((item, index) => (
        <div key={index}>
          <Link
            as={`/${item.vehicle}/${item.ownerName}`}
            href="/[vehicle]/[person]"
          >
            <a>
              {item.ownerName}'s {item.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};


// Note : getInitialProps can not be used in children components, only in the default export of every page
// this will run on server for the initial load then on the client side using next/link or next/router
// eg: person.js->if loaded directly initalprops run on the server but navigated from the links it will run  on the client 
List.getInitialProps =  async (ctx) => {
  console.log("*****getInitilaprops- list****");
  // ctx is the context object
  const response = await fetch('http://localhost:4001/vehicles');
  const data = await response.json();
  return { owners: data };
};

export default List;
