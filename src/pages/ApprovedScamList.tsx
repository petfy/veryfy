import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/TranslationContext";
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
import { ArrowUpDown, Flag, Shield } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScamReportForm } from "@/components/scam-reports/ScamReportForm";
import { RemovalRequestForm } from "@/components/scam-reports/RemovalRequestForm";

type SortField = "customer_name" | "report_count" | "created_at";

export default function ApprovedScamList() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data: reports, isLoading } = useQuery({
    queryKey: ["approved-scams", sortField, sortDirection],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scam_reports")
        .select(`
          *,
          report_count:scam_reports(count)
        `)
        .eq("status", "approved")
        .order(sortField, { ascending: sortDirection === "asc" });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch approved scam reports",
        });
        return [];
      }

      return data;
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
        <h1 className="text-2xl font-bold">{t("approvedScamList")}</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("customer_name")}
              >
                {t("customerName")}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>{t("customerDetails")}</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("report_count")}
              >
                {t("reportCount")}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>{t("actions")}</TableHead>
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
                          {t("reportAgain")}
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <ScamReportForm
                        onSuccess={() => {
                          toast({
                            title: "Success",
                            description: "Report submitted successfully",
                          });
                        }}
                      />
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          {t("requestRemoval")}
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