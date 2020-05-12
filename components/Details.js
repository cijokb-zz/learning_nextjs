import Link from "next/link";
import { useEffect, useState } from "react";

const people = [
  { vehicle: "car", name: "cijo" },
  { vehicle: "car", name: "rinu" },
];

export const Details = () => {
  return (
    <div>
      server
      {people.map((item, index) => (
        <div key={index}>
          <Link
            as={`/${item.vehicle}/${item.name}`}
            href="/[vehicle]/[person]"
          >
            <a>
              {item.nname}'s {item.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

// export default Details;
