export type DropDownProps = {
  code: string | null;
  name: string | null;
};
export interface DropDownPropsWithId extends DropDownProps {
  id: number | null;
  country_code?: string[];
}
export interface SingleSelectProps {
  defaultValue: DropDownPropsWithId;
  data: DropDownPropsWithId[];
  selectHandler: (
    item: DropDownPropsWithId | null,
    formFieldName: string
  ) => void;
  className?: string;
  formFieldName: string;
}
