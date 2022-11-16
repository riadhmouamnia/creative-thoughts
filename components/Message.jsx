export default function Message({
  children,
  avatar,
  username,
  title,
  description,
  timestamp,
}) {
  const fireBaseTime = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();

  return (
    <div className="py-8 border-gray-800 border-solid border-b-2">
      <div className="flex gap-4 items-center">
        <img src={avatar} alt={username} className="w-10 rounded-full py-2" />
        <h2 className="text-lg font-medium">{username}</h2>
      </div>
      <p className="text-sm text-gray-400">
        {date}, {atTime}
      </p>
      <div className="py-4">
        <h3 className="font-bold text-xl py-2 text-cyan-800">{title}</h3>
        <p className="font-medium p-2">{description}</p>
      </div>
      {children}
    </div>
  );
}
