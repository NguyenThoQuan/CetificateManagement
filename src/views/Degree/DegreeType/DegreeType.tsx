import {
  TextInput,
  Flex,
  Button,
  Badge,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useEffect, useState } from "react";
import { paginationBase } from "../../../base/BaseTable";
import {
  IconEdit,
  IconEye,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { RepositoryBase } from "../../../service/RepositoryBase";
import { ResponseBase } from "../../../model/ReponseBase";
import { useHotkeys } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import CreateDataView from "./CreateDataView";
import { DegreeTypeModelQuery } from "../../../model/DegreeType";

const DegreeType = () => {
  //data and fetching state
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DegreeTypeModelQuery[]>([]);
  console.log(data);
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

  const columns = React.useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên loại văn bằng",
        enableColumnActions: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "code",
        header: "Mã loại văn bằng",
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
        enableColumnActions: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "duration",
        header: "Thời gian học",
        enableColumnActions: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "level",
        header: "Cấp bậc",
        Cell: ({ row }) => (
          <Badge
            color={row.original.level === 0 ? "#09b8ff" : "#fc8c0c"}
            radius={"sm"}
          >
            {row.original.level === 0 ? "Đại học" : "Sau đại học"}
          </Badge>
        ),
        enableColumnActions: false,
        enableColumnFilter: false,
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
        enableColumnActions: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "description",
        header: "Ghi chú",
        enableColumnActions: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "action",
        header: "Thao tác",
        size: 10,
        Cell: () => (
          <Flex gap={"md"} align={"center"}>
            <Tooltip label="Chỉnh sửa">
              <ActionIcon variant="light" color="orange">
                <IconEdit size={20} stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Chi tiết">
              <ActionIcon variant="light" color="cyan">
                <IconEye size={20} stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Xóa">
              <ActionIcon variant="light" color="red">
                <IconTrash size={20} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        ),
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

    const fetchDataGetList = async () => {
      try {
        const url = "/api/DegreeType/get-list?PageIndex=0&PageSize=50";
        const repo = new RepositoryBase<ResponseBase<any>>(
          "https://localhost:7190"
        );
        const dataApi = await repo.get(url);
        if (dataApi && dataApi.isSuccess) {
          const result = dataApi?.data;
          setData(result?.data ? result?.data : []);
          setRowCount(result.count);
          setSelectIds([]);
          table.resetRowSelection();
          setIsLoading(false);
          setIsRefetching(false);
        }
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };

    fetchDataGetList();
  };

  const handleCreate = () => {
    // setDeleteViewStatus(!deleteViewStatus);
    modals.openConfirmModal({
      title: "Tạo mới khoa",
      size: "auto",
      children: <CreateDataView />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  useHotkeys([
    [
      "F11",
      () => {
        handleCreate();
      },
    ],
  ]);

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
    columns: columns,
    data: data,
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: () => (
      <Flex justify={"space-between"} w={"100%"}>
        <Flex gap="md">
          <TextInput placeholder="Nhập từ khóa" />
          <Button leftSection={<IconSearch size={"15px"} />}>Tìm kiếm</Button>
        </Flex>
        <Flex gap="md">
          <Button
            leftSection={<IconPlus size={"15px"} />}
            onClick={() => handleCreate()}
          >
            Thêm mới
          </Button>
        </Flex>
      </Flex>
    ),
    renderToolbarInternalActions: () => <></>,
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
    mantineTableBodyCellProps: () => ({
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

  return <MantineReactTable table={table} />;
};

export default DegreeType;