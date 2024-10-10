import { useState, useEffect } from "react";
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  ActionIcon,
  Stack,
  Button,
  Divider,
  Flex,
  ScrollArea,
  Box,
  Alert,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconTrash,
  IconPencil,
  IconInfoCircle,
} from "@tabler/icons-react";
import classes from "./TableSort.module.css";
import MyModal from "../MyModal";
import MyForm from "../MyForm";
import { useDisclosure } from "@mantine/hooks";
import { IModelField } from "~/models";
import { Database } from "~/postgrest/database";

interface RowData {
  name: string;
  email: string;
  phone: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

interface ITableSort {
  data: any[];
  colDef: IModelField[];
  createTitle?: string;
  formAction?: string;
  editTitle?: string;
  deleteTitle?: string;
  bindings?: { col: string; val: any };
  onSelect?: (id: any) => void;
}

export function TableSort({
  data,
  colDef,
  createTitle = "Create New Record",
  formAction,
  editTitle = "Edit Record",
  deleteTitle = "",
  bindings,
  onSelect,
}: ITableSort) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [deleteID, setDeleteID] = useState();
  const [editID, setEditID] = useState("");
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [selectedRow, setSelectedRow] = useState(data[0].id);
  const [defaultValues, setDefaultValues] =
    useState<Database["Tables"][keyof Database["Tables"]]["Row"]>();
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [delOpened, { open: delOpen, close: delClose }] = useDisclosure(false);
  const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);

  useEffect(() => {
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: "" })
    );
  }, [data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const handleDelete = (id: any) => {
    setDeleteID(id);
    delOpen();
  };

  const handleEdit = <T extends keyof Database["Tables"]>(
    row: Database["Tables"][T]["Row"]
  ) => {
    setDefaultValues(row);

    //@ts-ignore
    setEditID(row.id);
    editOpen();
  };

  const rows = sortedData
    .filter((row) => (bindings ? row[bindings.col] === bindings.val : true))
    .map((row) => (
      <Table.Tr
        onClick={() => {
          setSelectedRow(row.id);
          onSelect ? onSelect(row.id) : undefined;
        }}
        bg={
          selectedRow === row.id ? "var(--mantine-color-red-light)" : undefined
        }
        key={row.id}
      >
        <td>
          <Stack justify="center">
            <Flex justify="center">
              <ActionIcon
                color="red"
                variant="transparent"
                size="sm"
                ml="xs"
                onClick={() => handleDelete(row.id)}
              >
                <IconTrash />
              </ActionIcon>
              <ActionIcon
                color="blue"
                variant="transparent"
                size="sm"
                ml="xs"
                onClick={() => handleEdit(row)}
              >
                <IconPencil />
              </ActionIcon>
            </Flex>
          </Stack>
        </td>
        {colDef
          .filter((col) => col.name !== "id")
          .map((col) => (
            <Table.Td key={col.name}>{row[col.name]}</Table.Td>
          ))}
      </Table.Tr>
    ));

  return (
    <>
      <Group justify="space-between" mb="xs">
        <Button size="xs" onClick={addOpen} color="green">
          Create
        </Button>
        <TextInput
          placeholder="Search by any field"
          size="xs"
          w="30%"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
      </Group>
      <Divider />
      <ScrollArea w="100%">
        <Box>
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            miw={700}
            layout="fixed"
            className={classes.main}
          >
            <Table.Tbody>
              <Table.Tr>
                <th></th>
                {colDef
                  .filter((col) => col.name !== "id")
                  .map((col) => (
                    <Th
                      key={col.name}
                      sorted={sortBy === col.name}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting(col.name as keyof RowData)}
                    >
                      {col.label}
                    </Th>
                  ))}
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>{rows.length > 0 ? rows : null}</Table.Tbody>
          </Table>
          <MyModal title={deleteTitle} opened={delOpened} close={delClose}>
            <MyForm
              method="DELETE"
              onSubmit={delClose}
              onCancel={delClose}
              color="red"
              submitText="Delete"
              action={formAction}
            >
              <input type="text" name="id" value={deleteID} readOnly hidden />
              <Text mt="md" p="md" mb="md" size="lg" fw={700}>
                This action cannot be undone. Are you sure you want to proceed?
              </Text>
            </MyForm>
          </MyModal>
          <MyModal title={createTitle} opened={addOpened} close={addClose}>
            <MyForm
              fields={colDef}
              method="POST"
              onSubmit={addClose}
              onCancel={addClose}
              color="green"
              submitText="Create"
              action={formAction}
            />
          </MyModal>
          <MyModal title={editTitle} opened={editOpened} close={editClose}>
            <MyForm
              fields={colDef}
              method="PATCH"
              onSubmit={editClose}
              onCancel={editClose}
              color="blue"
              defaultValues={defaultValues}
              action={formAction}
            >
              <input type="text" name="id" value={editID} readOnly hidden />
            </MyForm>
          </MyModal>
        </Box>
      </ScrollArea>
    </>
  );
}
