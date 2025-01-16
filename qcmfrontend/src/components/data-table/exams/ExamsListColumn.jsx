import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown, Trash2, Loader, Flag, View } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { PROF_EXAM_ROUTE } from "../../../router";
export const ExamsListColumn = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    
    {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              #ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
    },
      {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "Description",
        cell:({row})=>{
          const payment = row.original;
          return (
            <>  
                 <span>{payment.description.slice(0, 30)}...</span>
                 {/* <span>{payment.description}...</span> */}
            </>
          );
        },
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
      accessorKey: "Datails",
      cell:({row})=>{
        const payment = row.original;
        return (
          <>  
            <Link to={`${PROF_EXAM_ROUTE}/${payment.id}`}>
              <View className="text-green-500" />
            </Link>
               
          </>
        );
      },
    },
     

]