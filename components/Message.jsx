import moment from "moment";

export default function Message({
  children,
  avatar,
  username,
  title,
  description,
  timestamp,
}) {
  const time = timestamp ? moment(timestamp.toDate()).calendar() : "";

  // const [date, setDate] = useState("");
  // const [atTime, setAtTime] = useState("");

  // const getTime = async () => {
  //   const fireBaseTime = new Date(
  //     timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  //   );
  //   setDate(fireBaseTime.toDateString());
  //   setAtTime(fireBaseTime.toLocaleTimeString());
  // };

  // useEffect(() => {
  //   if (!timestamp) return;
  //   getTime();
  // }, []);
  //.........................Method 2
  // const fireBaseTime = new Date(
  //   timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  // );
  // const date = fireBaseTime.toDateString();
  // const atTime = fireBaseTime.toLocaleTimeString();

  return (
    <div className="py-8 border-gray-800 border-solid border-b-2">
      <div className="flex itmes-center gap-2">
        <img
          src={avatar}
          alt={username}
          className="w-10 rounded-full py-2"
          referrerPolicy="no-referrer"
        />
        <div className="py-1">
          <h2 className="text-lg font-medium">{username}</h2>
          <p className="text-xs text-gray-400">
            {/* {date}, {atTime} */}
            {time}
          </p>
        </div>
      </div>
      <div className="py-4">
        <h3 className="font-bold text-xl py-2 text-cyan-800">{title}</h3>
        <p className="font-medium p-2">{description}</p>
      </div>
      {children}
    </div>
  );
}
