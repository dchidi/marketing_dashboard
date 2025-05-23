export type DropDownProps = {
  code: string | null;
  name: string | null;
};
export interface DropDownPropsWithId extends DropDownProps {
  id: number | null;
}
export interface SingleSelectProps {
  defaultValue: DropDownPropsWithId;
  data: DropDownPropsWithId[];
  selectHandler: (item: DropDownPropsWithId) => void;
  className?: string;
}
