import React from "react";

const Headling = (props) => {
  return (
    <div className="w-fit mx-auto">
      <h2 className="md:text-5xl text-3xl font-bold">
        <span className="text-purple-500 md:text-3xl">
          {" "}
          {props.hightlight}{" "}
        </span>{" "}
        {props.headlight}
      </h2>
      <div className=" w-20 h-1 bg-purple-400  md:mt-1 mt-1"></div>
    </div>
  );
};

export default Headling;
