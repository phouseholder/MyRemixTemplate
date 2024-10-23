import { IModelField } from "~/models";
import {
  NumberInput,
  TextInput,
  Select,
  Button,
  Flex,
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import database from "~/postgrest/database";
import { Database } from "~/postgrest/database";
import React, { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

export interface IListData {
  label: string;
  value: string;
}

interface IMyForm {
  action?: string;
  cancelText?: string;
  color?: string;
  children?: React.ReactNode;
  defaultValues?: Partial<Database["Tables"][keyof Database["Tables"]]["Row"]>;
  submitText?: string;
  fields?: IModelField[];
  method: "POST" | "PATCH" | "DELETE" | undefined;
  onSubmit: () => void;
  onCancel: () => void;
}

async function getListData<T extends keyof Database["Tables"]>(
  modelFields: IModelField[],
  table: T
) {
  const data = await database.findAll(table);
  const valueField =
    modelFields.find((field) => field.name === "id")?.name || "id";
  const labelField =
    modelFields.find((field) => field.list_title)?.name || "title";

  const listData = data.map((item: any) => ({
    label: item[labelField] || "",
    value: item[valueField],
  }));

  return listData;
}

function renderFields(
  fields: IModelField[] | undefined,
  defaults?: any | undefined
) {
  const [listData, setListData] = useState<IListData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (fields === undefined) {
    return;
  }

  return fields
    .filter((field) => field.name !== "id")
    .map(
      ({
        type,
        label,
        name,
        placeholder,
        required,
        list_fields,
        list_type,
      }) => {
        switch (type) {
          case "string":
            return (
              <Grid.Col key={name}>
                <TextInput
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  required={required}
                  defaultValue={defaults ? defaults[name] : undefined}
                />
              </Grid.Col>
            );
          case "number":
            return (
              <Grid.Col key={name}>
                <NumberInput
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  required={required}
                  defaultValue={defaults ? defaults[name] : undefined}
                />
              </Grid.Col>
            );
          case "date":
            return (
              <Grid.Col key={name}>
                <DateInput
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  defaultValue={
                    defaults
                      ? new Date(
                          new Date(defaults[name]).getTime() +
                            new Date(defaults[name]).getTimezoneOffset() * 60000
                        )
                      : undefined
                  }
                />
              </Grid.Col>
            );
          case "list":
            useEffect(() => {
              setIsLoading(true);
              getListData(list_fields!, list_type!)
                .then((data) => setListData(data))
                .finally(() => setIsLoading(false));
            }, [list_type]);
            //console.log(defaults[name]);
            return (
              <Grid.Col key={name}>
                <Select
                  name={name}
                  label={label}
                  data={listData}
                  defaultValue={"Parker"}
                  clearable
                />
              </Grid.Col>
            );
        }
      }
    );
}

export default function MyForm({
  action,
  cancelText = "Cancel",
  color,
  children,
  defaultValues,
  submitText = "Submit",
  fields,
  method,
  onSubmit,
  onCancel,
}: IMyForm) {
  const fetcher = useFetcher({ key: "form" });

  return (
    <fetcher.Form method={method} action={action}>
      <Grid grow>
        {renderFields(fields, defaultValues)}
        {children}
      </Grid>
      <Flex justify="right">
        <Button
          mt="md"
          mr="xs"
          variant="subtle"
          onClick={onCancel}
          color={color}
        >
          {cancelText}
        </Button>
        <Button
          mt="md"
          type="submit"
          variant="filled"
          onClick={onSubmit}
          color={color}
        >
          {submitText}
        </Button>
      </Flex>
    </fetcher.Form>
  );
}
