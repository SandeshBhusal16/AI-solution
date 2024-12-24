import logo from "../assets/bmw.png";
import { IoIosTimer } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
const Card = ({
  classname,
  imageCss,
  src,
  description,
  portfolio = false,
  title,
  rating,
  event = false,
  startDate,
  endDate,
  location,
}) => {
  return (
    <>
      {portfolio && (
        <div
          className={` border-[1px] rounded-lg ${classname}`}
          style={{
            boxShadow: "0 0 14px #bfd2f6",
          }}
        >
          <div>
            <img
              className={`rounded-lg ${imageCss}`}
              style={{ borderBottom: "1px solid #d8cccc" }}
              src={src || logo}
              alt=""
            />
          </div>
          <div className="p-4">
            <div className="flex justify-end">
              {Array.from({ length: rating }, (_, index) => (
                <span key={index}>⭐</span>
              ))}
            </div>

            <div className="font-bold text-md">{title}</div>
            <div className="">{description}</div>
          </div>
        </div>
      )}

      {event && (
        <div
          className={` border-[1px] rounded-lg ${classname}`}
          style={{
            boxShadow: "0 0 14px #bfd2f6",
          }}
        >
          <div>
            <img
              className={`rounded-lg ${imageCss}`}
              style={{ borderBottom: "1px solid #d8cccc" }}
              src={src || logo}
              alt=""
            />
          </div>
          <div className="p-4">
            <div className="font-bold text-md">{title}</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <IoIosTimer />
                <span className="text-sm">
                  {startDate} - {endDate}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <CiLocationOn />
                <span className="text-sm">{location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
