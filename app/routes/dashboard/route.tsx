import StatsGrid from "~/components/StatsGrid";
import Panel from "~/components/Panel";
import MyAppShell from "~/layouts/AppShell";
import { SimpleGrid } from "@mantine/core";
import { LineChart, BarChart } from "@mantine/charts";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "this is the main dashboard", content: "Dashboard" },
  ];
};

export default function Dashboard() {
  return (
    <MyAppShell>
      <StatsGrid />
      <SimpleGrid p="md" cols={{ base: 1, md: 2 }}>
        <Panel title="Monthly Spending">
          <LineChart
            h={300}
            dataKey="date"
            data={monthlySpending}
            lineProps={{ isAnimationActive: true }}
            withLegend
            tickLine="y"
            series={series}
            curveType="natural"
          />
        </Panel>
        <Panel title="Monthly Spending">
          <BarChart
            h={300}
            data={monthlySpending}
            dataKey="date"
            withLegend
            series={series}
            tickLine="y"
            barProps={{ isAnimationActive: true }}
          />
        </Panel>
      </SimpleGrid>
    </MyAppShell>
  );
}

export const monthlySpending = [
  { date: "Jan", Parker: 1837.52, Morgan: 1138.35, Amazon: 594.27 },
  { date: "Feb", Parker: 2052.01, Morgan: 842.14, Amazon: 383.67 },
  { date: "Mar", Parker: 3646.41, Morgan: 3940.18, Amazon: 872.86 },
  { date: "Apr", Parker: 1696.02, Morgan: 2638.06, Amazon: 787.11 },
  { date: "May", Parker: 2576.3, Morgan: 1476.82, Amazon: 508.48 },
  { date: "Jun", Parker: 1803.35, Morgan: 2406.28, Amazon: 474.13 },
  { date: "Jul", Parker: 1510.89, Morgan: 2220.96, Amazon: 812.83 },
  { date: "Aug", Parker: 2538.34, Morgan: 1106.96, Amazon: 397.38 },
  { date: "Sep", Parker: 1577.03, Morgan: 3079.96, Amazon: 818.48 },
];

export const series = [
  { name: "Parker", color: "red" },
  { name: "Morgan", color: "blue" },
  { name: "Amazon", color: "yellow" },
];
