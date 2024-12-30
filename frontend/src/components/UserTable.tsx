"use client"

import * as React from "react"
import {useEffect, useState} from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, ChevronLeftIcon, ChevronRightIcon, TrashIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {GenderMap, PositionMap, TitleMap, User, UserStatusMap} from "@/service/schema/user"
import {AvatarUriFromName, formatDate, isAdmin} from "@/lib/utils"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import Link from "next/link"
import {deleteUser} from "@/service/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Badge} from "@/components/ui/badge";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="选择所有行"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="选择行"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        名字
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => (
      <Button variant="ghost" asChild>
        <Link href={`/employees/${row.original.id}`}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={AvatarUriFromName(row.original.name)} alt={row.original.name}/>
            <AvatarFallback>{row.original.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{row.original.name}</span>
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: "gender",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        性别
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => <Badge variant={"outline"}>{GenderMap[row.original.gender]}</Badge>,
  },
  {
    accessorKey: "work_id_number",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        工号
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => <Badge variant="secondary" className="font-mono text-sm">{row.original.work_id_number}</Badge>,
  },
  {
    accessorKey: "hire_date",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        入职日期
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => <div>{formatDate(row.original.hire_date)}</div>,
  },
  {
    accessorKey: "position",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        职位
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => <div>{PositionMap[row.original.position]}</div>,
  },
  {
    accessorKey: "title",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        职务
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => <div>{TitleMap[row.original.title]}</div>,
  },
  {
    accessorKey: "supervisor",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        上级
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => (
      <div>
        <span>{row.original.supervisor?.name}</span> <Badge variant="secondary"
                                                            className="font-mono text-sm">{row.original.supervisor?.work_id_number}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        状态
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => UserStatusMap[row.original.status] ? (
      <Badge> 在职 </Badge>
    ) : (
      <Badge variant={"destructive"}> 离职 </Badge>
    )
  },
  {
    accessorKey: "department",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        部门
        <ArrowUpDown/>
      </Button>
    ),
    cell: ({row}) => <div>{row.original.department?.name}</div>,
  },
]

const exportToCSV = (users: User[]) => {
  const headers = [
    '姓名', '性别', '工号', '入职日期', '职位', '职务',
    '上级', '状态', '部门', '电话号码', '身份证号'
  ];

  const data = users.map(user => [
    user.name,
    GenderMap[user.gender],
    user.work_id_number,
    formatDate(user.hire_date),
    PositionMap[user.position],
    TitleMap[user.title],
    user.supervisor?.name || '',
    UserStatusMap[user.status],
    user.department?.name || '',
    user.phone_number,
    user.id_number
  ]);

  const csvContent = [
    headers.join(','),
    ...data.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], {type: 'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', ` 员工数据 _${formatDate(new Date())}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const UserTable: React.FC<{ users: User[] }> = ({users}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    gender: false,
    hire_date: false,
    supervisor: false,
    status: false,
    position: false
  })
  const [rowSelection, setRowSelection] = React.useState({})
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    isAdmin().then(setIsAdminUser);
  }, []);

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
      setUserToDelete(null);
    }
  };

  const adminColumns: ColumnDef<User>[] = [
    {
      id: "actions",
      cell: ({row}) => (
        <Button
          variant="ghost"
          className="text-red-600 hover:text-red-800"
          onClick={() => setUserToDelete(row.original)}
        >
          <TrashIcon className="h-4 w-4"/>
        </Button>
      ),
    },
  ];

  const allColumns = isAdminUser ? [...columns, ...adminColumns] : columns;

  const table = useReactTable({
    data: users,
    columns: allColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center py-4">
          <Input
            placeholder="搜索"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mb-4 sm:mb-0 sm:mr-4"
          />
          <div className="flex space-x-2 ml-auto">
            {isAdminUser && (
              <>
                <Button
                  variant="outline"
                  onClick={() => exportToCSV(users)}
                  className="whitespace-nowrap"
                >
                  导出数据
                </Button>
                <Button
                  variant="default"
                  onClick={() => window.location.href = '/employees/new'}
                  className="whitespace-nowrap"
                >
                  新建员工
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  筛选 <ChevronDown/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            选中 {table.getFilteredRowModel().rows.length} 中的 {table.getFilteredSelectedRowModel().rows.length} 条
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon/>
              上一页
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon/>
              下一页
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> 确认删除 </AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除员工 {userToDelete?.name} 吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> 取消 </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default UserTable

