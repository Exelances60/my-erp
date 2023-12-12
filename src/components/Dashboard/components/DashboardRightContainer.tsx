"use client";
import React, { useState } from "react";
import { AreaChart, BarChart, Card, EventProps } from "@tremor/react";
import { chartdata } from "@/mock/mockData";

const DashboardRightContainer = () => {
  const [selectChart, setSelectChart] = useState<EventProps>();
  const tlValueFormatter = (number: number) =>
    `TL ${new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(number)}`;
  let total = 0;

  return (
    <div className="md:w-[50%] h-full box-border px-5 pt-10">
      <Card className="w-full flex flex-col min-h-fit items-center justify-between  ">
        <div className="flex flex-col">
          <span className="text-sm">Toplam Gelir</span>
          {chartdata.map((data, index) => {
            total += data.target;
            if (index === chartdata.length - 1) {
              return (
                <span key={index} className="text-3xl">
                  {tlValueFormatter(total)}
                </span>
              );
            }
          })}
        </div>
        <AreaChart
          className="h-48"
          data={chartdata}
          categories={["target"]}
          index="month"
          showAnimation={true}
          colors={["blue"]}
          showYAxis={false}
          showLegend={false}
        />
      </Card>
      <Card className="w-full flex min-h-fit flex-col items-center justify-between mx-auto px-4 py-3.5 mt-5">
        <BarChart
          className="h-52 min-h-[10vh]"
          data={chartdata}
          categories={["target"]}
          index="month"
          showAnimation={true}
          colors={["blue"]}
          showYAxis={false}
          onValueChange={(value: EventProps) => setSelectChart(value)}
          showLegend={false}
        />
        <pre>{JSON.stringify(selectChart)}</pre>
      </Card>
    </div>
  );
};

export default DashboardRightContainer;
