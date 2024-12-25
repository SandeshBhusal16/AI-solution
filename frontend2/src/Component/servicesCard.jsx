import logo from "../assets/bmw.png";
const ServicesCard = ({
  Containercss,
  imgsrc,
  title,
  description,
  descriptionCss,
  imgCss,
  titleCss,
  header,
  position,
  testimonial = false,
  service = false,
}) => {
  return (
    <>
      {" "}
      {testimonial && (
        <div
          className={`w-[300px]  flex flex-col gap-1 bg-slate-300 p-4  pt-0 rounded-md my-2 ${Containercss}`}
        >
          <div className="flex relative justify-center  w-full h-[50px]">
            <img
              className={`w-[100px] h-[100px] rounded- absolute top-[-50px] border-[5px] border-white ${imgCss}`}
              src={imgsrc}
            />
          </div>
          <div className={`mt-[20px] ${descriptionCss}`}>{description}</div>

          <div className="flex flex-col gap-1 text-center">
            <span className={`text-[#2590f4] ${titleCss}`}>{title}</span>
            <span>{position}</span>
          </div>
        </div>
      )}
      {service && (
        <div
          className={`w-[400px]  flex flex-col gap-1 bg-[#fbfbfb] p-4 rounded-md my-2 ${Containercss}`}
        >
          <div className="flex justify-center">
            <img
              className={`w-[50px] h-[50px] p-1 rounded-full  ${imgCss}`}
              src={imgsrc}
            />
          </div>

          <div className="flex gap-2 justify-center">
            <span className={titleCss}>{title}</span>
          </div>
          <div className={`flex text-center ${descriptionCss}`}>
            {description}
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesCard;
