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
            <div className="flex justify-end gap-[1px]">
              {Array.from({ length: rating }, (_, index) => (
                <span key={index}>
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4.20143L7.74278 3.76805L6 0L4.25722 3.76805L0 4.20143L3.17984 6.96404L2.2921 11L6 8.93868L9.7079 11L8.82016 6.96404L12 4.20143Z"
                      fill="#F89336"
                    />
                  </svg>
                </span>
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
