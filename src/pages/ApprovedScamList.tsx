import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScamReportForm } from "@/components/scam-reports/ScamReportForm";
import { RemovalRequestForm } from "@/components/scam-reports/RemovalRequestForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag, Shield, ArrowUpDown } from "lucide-react";
import type { ScamReport } from "@/components/scam-reports/types";

type SortField = "customer_name" | "report_count" | "created_at";

export default function ApprovedScamList() {
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["approved-scams", sortField, sortDirection],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scam_reports")
        .select(`
          *,
          report_count:count() over (partition by reported_email)
        `)
        .eq("status", "approved")
        .order(sortField, { ascending: sortDirection === "asc" });

      if (error) throw error;
      return data as ScamReport[];
    },
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Approved Scam List</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("customer_name")}
              >
                Customer Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Customer Details</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("report_count")}
              >
                Report Count
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports?.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                {report.customer_first_name} {report.customer_last_name}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p>{report.reported_email}</p>
                  <p>{report.customer_phone}</p>
                  <p>
                    {report.customer_address}, {report.customer_city},{" "}
                    {report.customer_country}
                  </p>
                </div>
              </TableCell>
              <TableCell>{report.report_count}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Report Again
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <ScamReportForm
                        initialData={{
                          reported_email: report.reported_email,
                          customer_first_name: report.customer_first_name,
                          customer_last_name: report.customer_last_name,
                          customer_phone: report.customer_phone,
                          customer_address: report.customer_address,
                          customer_city: report.customer_city,
                          customer_country: report.customer_country,
                        }}
                      />
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Request Removal
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <RemovalRequestForm scamReportId={report.id} />
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}