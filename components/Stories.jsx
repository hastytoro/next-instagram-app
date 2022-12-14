import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { faker } from "@faker-js/faker";

function Story({ username, avatar }) {
  return (
    <div className="">
      <Image
        src={avatar}
        alt="profile"
        width={100}
        height={100}
        className="object-contain rounded-full w-14 h-14 p-[1.5px] border-red-400 border-2 hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-[11px] text-center truncate w-14">
        {username.toLowerCase()}
      </p>
    </div>
  );
}

export default function Stories() {
  const [profiles, setProfiles] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fakeData = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      company: faker.company.name(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setProfiles(fakeData);
  }, []);

  if (!profiles) return <h1>Loading...</h1>;
  return (
    <div className="flex gap-2 p-6 mt-8 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin scrollbar-thumb-slate-600">
      {session && (
        <Story
          key={session.user.userId}
          username={session.user.username}
          avatar={session.user.image}
        />
      )}
      {profiles.map(({ userId, username, avatar }) => (
        <Story key={userId} username={username} avatar={avatar} />
      ))}
    </div>
  );
}
