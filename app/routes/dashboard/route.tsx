import StatsGrid from "~/components/StatsGrid";
import Panel from "~/components/Panel";
import MyAppShell from "~/layouts/AppShell";
import { SimpleGrid } from "@mantine/core";
import { AreaChart, BarChart } from "@mantine/charts";
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
        <Panel title="Line Chart">
          <AreaChart
            h={300}
            data={data}
            dataKey="date"
            type="stacked"
            withLegend
            series={series}
            curveType="natural"
            areaProps={{ isAnimationActive: true }}
          />
        </Panel>
        <Panel title="Bar Chart">
          <BarChart
            h={300}
            data={data}
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

export const data = [
  { date: "Jan", Series1: 120, Series2: 230, Series3: 310 },
  { date: "Feb", Series1: 180, Series2: 250, Series3: 400 },
  { date: "Mar", Series1: 140, Series2: 310, Series3: 390 },
  { date: "Apr", Series1: 270, Series2: 260, Series3: 420 },
  { date: "May", Series1: 330, Series2: 390, Series3: 470 },
  { date: "Jun", Series1: 290, Series2: 440, Series3: 520 },
  { date: "Jul", Series1: 370, Series2: 460, Series3: 570 },
  { date: "Aug", Series1: 410, Series2: 510, Series3: 620 },
  { date: "Sep", Series1: 500, Series2: 480, Series3: 670 },
  { date: "Oct", Series1: 530, Series2: 560, Series3: 720 },
  { date: "Nov", Series1: 480, Series2: 600, Series3: 760 },
  { date: "Dec", Series1: 620, Series2: 650, Series3: 810 },
];

export const series = [
  { name: "Series1", color: "indigo" },
  { name: "Series2", color: "blue" },
  { name: "Series3", color: "teal" },
];
