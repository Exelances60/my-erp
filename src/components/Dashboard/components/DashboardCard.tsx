import React from "react";
import { Card, Text, Grid, Title } from "@tremor/react";
import { ShoppingBagIcon } from "@heroicons/react/outline";

const DashboardCard = () => {
  return (
    <Grid numItemsSm={2} numItemsLg={2} className="gap-6 mt-3">
      <Card>
        <ShoppingBagIcon className="h-6 w-6 " />
        <Title className="mt-6">Satışlar</Title>
        <Text>Toplam Satışlar</Text>
      </Card>
    </Grid>
  );
};

export default DashboardCard;
