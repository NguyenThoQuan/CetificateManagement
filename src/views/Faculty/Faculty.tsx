import { Box, TextInput, Flex, Button, Badge } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useEffect, useState } from "react";
import { paginationBase } from "../../base/BaseTable";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { RepositoryBase } from "../../service/RepositoryBase";
import { FacultyModelQuery } from "../../model/Faculty";
import { ResponseBase } from "../../model/ReponseBase";

const Faculty = () => {
  //data and fetching state
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = useState<FacultyModelQuery[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [height, setHeight] = useState(0);
  const [pagination, setPagination] = useState(paginationBase);
  //table state
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [deleteViewStatus, setDeleteViewStatus] = useState(false);
  //count
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  const columns = React.useMemo<MRT_ColumnDef<FacultyModelQuery>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên khoa",
      },
      {
        accessorKey: "code",
        header: "Mã khoa",
        Cell: ({ renderedCellValue }) => (
          <Badge
            radius="sm"
            variant="dot"
            size="lg"
            color={renderedCellValue === null ? "red" : "green"}
          >
            {renderedCellValue === null ? null : renderedCellValue}
          </Badge>
        ),
      },
      {
        accessorKey: "active",
        header: "Hoạt động",
        Cell: ({ row }) => (
          <Badge
            color={row.original.active === true ? "green" : "red"}
            radius={"sm"}
          >
            {row.original.active === true ? "Đang hoạt động" : "Dừng hoạt động"}
          </Badge>
        ),
      },
      {
        accessorKey: "description",
        header: "Ghi chú",
      },
      {
        accessorKey: "description",
        header: "Ghi chú",
      },
      {
        accessorKey: "description",
        header: "Ghi chú",
      },
      {
        accessorKey: "description",
        header: "Ghi chú",
      },
      {
        accessorKey: "action",
        header: "Thao tác",
        size: 50,
        enableSorting: false,
        enableColumnActions: false,
        enableColumnFilter: false,
      },
    ],
    []
  );

  const fetchData = async () => {
    setIsLoading(true);
    setIsRefetching(true);
    setIsError(false);
    setData([]);
    setRowCount(0);

    // let url = `?Skip=${pagination?.pageIndex * pagination?.pageSize}&Take=${
    //   pagination.pageSize
    // }`;

    const fetchFacultyList = async () => {
      try {
        const url = "/api/Faculty/get-list?PageIndex=0&PageSize=1";
        const repo = new RepositoryBase<ResponseBase<FacultyModelQuery>>(
          "http://localhost:5268"
        );
        const facultyList = await repo.get(url);
        console.log(facultyList);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };

    fetchFacultyList();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const handleResize = () => {
      // 190 là chiều cao của phần phân trang
      // headerHeight là chiều cao của phần header
      setHeight(window.innerHeight - (140 + headerHeight));
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize); // Update height on window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  const table = useMantineReactTable({
    columns,
    data,
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Flex justify={"space-between"} w={"100%"}>
        <Flex gap="md">
          <TextInput placeholder="Nhập từ khóa" />
          <Button leftSection={<IconSearch size={"15px"} />}>Tìm kiếm</Button>
        </Flex>
        <Flex gap="md">
          <Button leftSection={<IconPlus size={"15px"} />}>Thêm mới</Button>
        </Flex>
      </Flex>
    ),
    renderToolbarInternalActions: ({ table }) => <></>,
    mantineTopToolbarProps: {
      style: {
        borderBottom: "3px solid rgba(128, 128, 128, 0.5)",
        marginBottom: 5,
      },
    },
    getRowId: (row) => row.id?.toString(),
    initialState: {
      showColumnFilters: false,
      columnPinning: {
        left: ["mrt-row-select", "code"],
        right: ["action"],
      },
      columnVisibility: { id: false },
      density: "xs",
    },
    mantineTableContainerProps: {
      style: { maxHeight: height, minHeight: height },
    },
    enableStickyHeader: true,
    onRowSelectionChange: setRowSelection,
    manualFiltering: false,
    manualPagination: true,
    manualSorting: false,
    rowCount,
    onPaginationChange: setPagination,
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        fontWeight: "500",
        fontSize: "12.5px",
        padding: "5px 15px",
      },
    }),
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      showSkeletons: isLoading,
      rowSelection,
    },
    mantineToolbarAlertBannerProps: false
      ? { color: "red", children: "Lỗi tải dữ liệu !" }
      : undefined,
    mantinePaginationProps: {
      showRowsPerPage: true,
      withEdges: true,
      rowsPerPageOptions: ["20", "50", "100"],
    },
    paginationDisplayMode: "pages",
    enableColumnPinning: true,
    mantineTableProps: {
      striped: false,
    },
    columnFilterDisplayMode: "popover",
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: { cursor: "pointer" },
    }),
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default Faculty;
