interface MessageProps {
  sender: string;
  message: string;
  isSender: boolean;
}

export default function MessageCard({
  sender,
  message,
  isSender,
}: MessageProps) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      {isSender && <div className="w-4 h-4 rounded-full bg-gray-300" />}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{sender}</p>
        <span
          className={`text-sm py-2  text-gray-800 rounded-2xl ${
            isSender
              ? "rounded-tr-none bg-black  text-white"
              : " bg-gray-300 rounded-tl-none"
          } px-4`}
        >
          {message}
        </span>
      </div>
      {!isSender && <div className="w-4 h-4 rounded-full bg-black" />}
    </div>
  );
}
