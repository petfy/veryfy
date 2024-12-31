import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EvidenceModal } from "./EvidenceModal";

export type ScamReport = {
  id: string;
  reported_email: string;
  description: string;
  status: string;
  created_at: string;
  evidence_url: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
};

interface ScamReportTableProps {
  reports: ScamReport[];
}

export function ScamReportTable({ reports }: ScamReportTableProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "default",
      reviewed: "secondary",
      dismissed: "destructive",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reported Email</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  {report.reported_email}
                </TableCell>
                <TableCell>
                  {report.customer_first_name && report.customer_last_name ? (
                    <div>
                      <p>{`${report.customer_first_name} ${report.customer_last_name}`}</p>
                      {report.customer_city && report.customer_country && (
                        <p className="text-sm text-muted-foreground">
                          {`${report.customer_city}, ${report.customer_country}`}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No details</span>
                  )}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {report.description}
                </TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell>
                  {new Date(report.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedEvidence(report.evidence_url)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Evidence
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EvidenceModal
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        evidenceUrl={selectedEvidence || ""}
      />
    </>
  );
}