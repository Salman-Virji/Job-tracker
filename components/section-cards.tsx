"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatusCount = {
  status: string;
  count: number;
};
export function SectionCards() {
  const [statusData, setStatusData] = useState<StatusCount[]>([]);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);

  const getCountByStatus = (status: string) =>
    statusData.find((s) => s.status === status)?.count || 0;

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const { data, error } = await supabase.rpc(
        "get_application_status_counts"
      );

      if (error) {
        console.error("Error fetching status counts:", error.message);
      } else {
        const counts = data as StatusCount[];
        setStatusData(counts);
      }
    };

    fetchStatusCounts();
  }, []);
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Total Applications  */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Applications</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {getCountByStatus("Submitted") +
              getCountByStatus("Rejected-No Interview") +
              getCountByStatus("Rejected-After Interview") +
              getCountByStatus("In-progress") +
              getCountByStatus("Offers")}
          </CardTitle>
          <div className="absolute right-4 top-4">
            {/* <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge> */}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div> */}
          <div className="line-clamp-1 flex gap-2 font-medium">
            Applications you've sent off and are awaiting response.
          </div>
          <div className="text-muted-foreground"></div>
        </CardFooter>
      </Card>

      {/* In-Progress Applications  */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>In-progress Applications</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {getCountByStatus("In-progress")}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Jobs you’re currently interviewing or in contact for.
          </div>
        </CardFooter>
      </Card>

      {/* Rejected Applications  */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Rejected Applications</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {getCountByStatus("Rejected-No Interview") +
              getCountByStatus("Rejected-After Interview")}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Applications that didn’t lead to an offer.
          </div>
          <div className="text-muted-foreground">
            No Interview: {getCountByStatus("Rejected-No Interview")},
            Interviewed: {getCountByStatus("Rejected-After Interview")}
          </div>
        </CardFooter>
      </Card>

      {/* Offers  */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Offers</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {getCountByStatus("Offers")}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Opportunities where you received an offer
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
