"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  visitors: {
    label: "Applications",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("7d");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const [chartData, setChartData] = useState<{ date: string; count: number }[]>(
    []
  );

  type ApplicationCount = {
    date_applied: Date;
    count: number;
  };

  // TESTING SAMPLE  DATA 
  // const chartData = Array.from({ length: 100 }, (_, i) => {
  //   const date = new Date();
  //   date.setDate(date.getDate() - (99 - i)); // spread over 100 days

  //   return {
  //     date: date.toISOString().slice(0, 10), // YYYY-MM-DD
  //     count: Math.floor(Math.random() * 6), // 0–5 applications per day
  //   };
  // });

  useEffect(() => {
    const fetchChartData = async () => {
      const { data, error } = await supabase.rpc(
        "get_application_counts_by_day"
      );

      if (error) {
        console.error("Error fetching chart data:", error.message);
      } else if (data) {
        const formatted = (data as ApplicationCount[]).map((d) => ({
          date: new Date(d.date_applied + "T12:00:00").toISOString(),
          count: d.count,
        }));
        setChartData(formatted);
      }
      setLoading(false);
    };

    fetchChartData();
  }, []);

 
  const filteredData = React.useMemo(() => {
    const today = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToSubtract);

    const hasDataInRange = chartData.some((item) => {
      const date = new Date(item.date)
      return date >= startDate
    })

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [chartData, timeRange]);

  const timeRangeLabels: Record<string, string> = {
    "7d": "Total for the last 7 Days ",
    "30d": "Total for the last 30 Days",
    "90d": "Total for the last 3 months",
  }

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Applications</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
          {timeRangeLabels[timeRange]}
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            //onValueChange={setTimeRange}
            onValueChange={(val) => {
              console.log("New time range:", val);
              setTimeRange(val);
            }}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {loading ? (
            <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground text-sm">
              Loading chart...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground text-sm">
              No application data in this time range.
            </div>
          ) : (
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    //stopColor="var(--color-desktop)"
                    stopColor="#1e40af"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    //stopColor="var(--color-desktop)"
                    stopColor="#1e40af"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="count"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
