import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Store } from "./types";
import { useTranslation } from "@/contexts/TranslationContext";
import { TranslationKey } from "@/translations";
import { Avatar } from "@/components/ui/avatar";

interface StoreVerificationsTableProps {
  stores: Store[];
  onViewDetails: (store: Store) => void;
}

export function StoreVerificationsTable({
  stores,
  onViewDetails,
}: StoreVerificationsTableProps) {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "default",
      verified: "secondary",
      rejected: "destructive",
    };

    return <Badge variant={variants[status]}>{t(status as TranslationKey)}</Badge>;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>{t("storeName" as TranslationKey)}</TableHead>
            <TableHead>{t("storeUrl" as TranslationKey)}</TableHead>
            <TableHead>{t("status" as TranslationKey)}</TableHead>
            <TableHead>{t("actions" as TranslationKey)}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell>
                <Avatar className="h-8 w-8">
                  {store.logo_url ? (
                    <img 
                      src={store.logo_url} 
                      alt={store.name} 
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {store.name[0]}
                    </div>
                  )}
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{store.name}</TableCell>
              <TableCell>
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {store.url}
                </a>
              </TableCell>
              <TableCell>{getStatusBadge(store.verification_status)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(store)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {t("view" as TranslationKey)}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}