import React from "react";
import Reveal from "./Reveal";

function Descriptions() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Title */}
      <Reveal>
        <p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-4xl font-bold leading-tight tracking-tighter text-transparent text-center">
          How it works...
        </p>
      </Reveal>

      {/* Description */}
      <Reveal>
        <div className="border border-gray-90 border-b-0 p-4 rounded-md max-w-2xl">
          <p className="text-center font-[SF Pro Display] text-lg leading-relaxed">
            trcBudg8 is a tool that you can use to design your budget.</p> <Reveal><p className="text-center font-[SF Pro Display] text-lg leading-relaxed">A successful budget planner that helps you decide how to best manage your finances while avoiding or reducing debt. Simply add income against your expenses and reveal experience the best visual analytics and seamless Ai suggestions.</p></Reveal>
          
        </div>
      </Reveal>

      {/* Right-aligned text in an invisible box */}
      <Reveal>
        <div className="flex justify-end w-full pr-10">
          <div className="w-[400px] h-[200px] flex items-center border border-gray-90 border-b-0 p-4 rounded-md">
            <p className="text-right font-[SF Pro Display] text-xl leading-relaxed">
              Our new online tool helps you keep track of your money. Plus, it suggests ways to improve your finances.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
  <div className="flex justify-start w-full pl-10">
    <div className=" h-auto flex items-center border border-gray-100 border-b-0 p-6 rounded-md">
      <p className="text-left font-[SF Pro Display] text-xl leading-relaxed">
        The trcBudg8 budget tracker is a versatile tool that can be applied across a wide range of financial management needs, from personal budgeting to business financial planning. For individuals, it helps track income, expenses, and savings goals, ensuring better control over personal finances. For businesses, it assists in monitoring cash flow, managing operational expenses, and planning for future investments, allowing businesses to optimize their financial strategies and make informed decisions. Whether for personal use or business operations, trcBudg8 empowers users to take charge of their financial health and achieve their goals effectively.
      </p>
    </div>
  </div>
</Reveal>


      {/* Left-aligned information in an invisible box */}
      <div className="flex justify-start w-full pl-10">
        <div className="w-[300px] h-[300px] flex flex-col justify-center">
          <Reveal>
            <div >
              <p className="text-left font-[SF Pro Display] text-xl leading-relaxed">
                It will give you:
              </p>
              <hr />
              <br />
            </div>
          </Reveal>
          <Reveal>
            <div className="border border-gray-100 border-b-0 p-4 rounded-md">
              <p className="text-left font-[SF Pro Display] text-xl leading-relaxed">
                🎉A breakdown of your finances by category
              </p>
              <br />
            </div>
          </Reveal>
          <Reveal>
            <div className="border border-gray-200  p-4 rounded-md">
              <p className="text-left font-[SF Pro Display] text-xl leading-relaxed">
              🎉Personalized tips to make the most of your money
              </p>
              <br />
            </div>
          </Reveal>
          <Reveal>
            <div className="border border-gray-200 border-b-0 p-4 rounded-md">
              <p className="text-left font-[SF Pro Display] text-xl leading-relaxed">
              🎉Add your income and expenses to this budget planner.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default Descriptions;
