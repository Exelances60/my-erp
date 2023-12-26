import { Employee } from "@prisma/client";
import { Flex, Text, BadgeDelta } from "@tremor/react";

export const renderEmployeeChange = (
  changeEmployeeMode: boolean,
  oldEmployee: Employee[],
  newEmployee: Employee[]
) => {
  if (changeEmployeeMode) {
    return oldEmployee.map((item) => (
      <div key={item.id} className="space-y-2 mt-2">
        <Flex className="gap-2">
          <Text>
            ID : {item.id} {item.name}
          </Text>
          <Text className="text-red-400 text-lg">
            {`${item.createdAt.toLocaleDateString()} `} Tarhinde İşe Başladı
          </Text>
        </Flex>
      </div>
    ));
  } else {
    return newEmployee.map((item) => (
      <div key={item.id} className="space-y-2 mt-2 ">
        <Flex className="gap-2" justifyContent="between">
          <Text>
            ID : {item.id} {item.name}
          </Text>
          <Text className="text-red-400 text-lg">
            {`${item.createdAt.toLocaleDateString()} `} Tarhinde İşe Başladı
          </Text>
        </Flex>
      </div>
    ));
  }
};

export const renderPercentageIncrease = (payload: string) => {
  if (Number(payload) > 0) {
    return <BadgeDelta className="ml-2">{payload} %</BadgeDelta>;
  } else {
    return (
      <BadgeDelta className="ml-2" deltaType="decrease">
        {payload} %
      </BadgeDelta>
    );
  }
};
