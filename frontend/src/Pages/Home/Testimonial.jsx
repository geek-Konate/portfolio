import React from "react";
import data from "../../data/index.json";

export default function Testimonial() {
  return (
    <>
      <section
        className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 bg-[--bg-shade]"
        id="testimonial"
      >
        <div className="container-testmonial-box max-w-7xl mx-auto">
          <div className="testimonial__data text-center mb-8 lg:mb-12">
            <p className="text-[#333] mb-2 text-sm sm:text-base">
              Clients-feedbacks
            </p>
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
              Clients-FEEDBACKS
            </h1>
          </div>
          <div className="testi_data flex flex-col md:flex-row gap-6 lg:gap-8 mt-7">
            {data?.testimonial?.map((items, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col border shadow-md rounded-lg p-4 lg:p-6 bg-white hover:shadow-lg transition-shadow duration-300"
              >
                {/* Étoiles */}
                <div className="flex gap-1 text-yellow-400 mb-3 lg:mb-4 text-base lg:text-lg justify-center md:justify-start">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                </div>

                {/* Description */}
                <p className="my-3 text-gray-600 text-sm lg:text-base leading-relaxed text-center md:text-left flex-1">
                  {items.description}
                </p>

                {/* Auteur */}
                <div className="flex items-center gap-3 mt-4 lg:mt-6 pt-4 border-t border-gray-100">
                  <img
                    src={items.src}
                    alt={items.author_name}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800 text-sm lg:text-base">
                      {items.author_name}
                    </p>
                    {items.author_designation && (
                      <p className="text-gray-500 text-xs lg:text-sm">
                        {items.author_designation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
