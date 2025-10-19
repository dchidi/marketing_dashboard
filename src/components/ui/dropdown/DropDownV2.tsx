import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { Row } from "../../layouts/row_col/RowCol";
import styles from "./DropDownV2.module.css";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export type Option = { id: number; name: string; code: string };

type DropDownV2Props = {
  data: Option[];
  defaultValue?: string | string[]; // "a,b,c" or ["a","b","c"]
  onChange?: (codes: string[]) => void; // fire on toggle/Done
  placeholder?: string;
  className?: string;
};

const toCodes = (v?: string | string[]) =>
  Array.isArray(v)
    ? v
    : (v ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

export const DropDownV2: React.FC<DropDownV2Props> = ({
  data,
  defaultValue,
  onChange = () => {},
  placeholder = "Select…",
  className,
}) => {
  const allCodes = useMemo(() => data.map((d) => d.code), [data]);

  // init & keep in sync with prop changes
  const initial = useMemo(
    () => new Set<string>(toCodes(defaultValue)),
    [defaultValue]
  );
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(initial);

  useEffect(() => setSelected(initial), [initial]);

  const toggle = useCallback(
    (code: string) => {
      setSelected((prev) => {
        const next = new Set(prev);

        if (code === "all") {
          const isAllSelected =
            next.size === allCodes.length || next.has("all");
          next.clear();
          if (!isAllSelected) allCodes.forEach((c) => next.add(c));
        } else {
          next.has(code) ? next.delete(code) : next.add(code);
          // keep "all" normalized
          const every = allCodes.every((c) => next.has(c));
          if (every) allCodes.forEach((c) => next.add(c));
          else next.delete("all");
        }

        // onChange([...next]); // notify parent immediately
        return next;
      });
    },
    [allCodes]
  );

  const [toggleDropDown, setToggleDropDown] = useState(false);

  const label = useMemo(() => {
    const codes = [...selected].filter((c) => c !== "all");
    if (selected.has("all") || codes.length === allCodes.length) {
      return data[0]?.name ?? "All";
    }
    if (codes.length === 0) return placeholder;
    const first = data.find((d) => d.code === codes[0])?.name ?? placeholder;
    const extra = codes.length - 1;
    return extra > 0 ? `${first} & ${extra} more` : first;
  }, [selected, data, allCodes.length, placeholder]);

  const clear = () => {
    setSelected(new Set());
    // onChange([]);
  };
  const selectAll = () => {
    const s = new Set(allCodes);
    setSelected(s);
    // onChange([...s]);
  };

  const done = () => {
    const payload = selected.size === 0 ? ["all"] : [...selected];
    onChange(payload);
    setSelected(new Set(payload));
    setOpen(false);
  };

  const handleMenuView = () => {
    setOpen((o) => !o);
    setToggleDropDown((prev) => !prev);
  };

  return (
    <div className={`${styles.ddv2} ${className ?? ""}`}>
      <button
        type="button"
        className={styles.ddv2Display}
        onClick={handleMenuView}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {label} {toggleDropDown ? <FaCaretUp /> : <FaCaretDown />}
      </button>

      {open && (
        <div
          className={styles.ddv2SelectBox}
          role="listbox"
          aria-multiselectable="true"
          onMouseDown={(e) => e.preventDefault()} // keep focus while clicking
        >
          {data.map((item) => {
            const checked = selected.has(item.code);
            return (
              <Row
                key={item.code}
                className={styles.ddv2Item}
                aria-selected={checked}
                onClick={() => toggle(item.code)}
              >
                {checked ? (
                  <MdOutlineCheckBox fontSize={22} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank fontSize={22} />
                )}
                {item.name}
              </Row>
            );
          })}

          <Row className={styles.ddv2Actions}>
            <button type="button" onClick={clear}>
              Clear
            </button>
            <button type="button" onClick={selectAll} className={styles.lg}>
              Select all
            </button>
            <button type="button" onClick={() => done()}>
              Done
            </button>
          </Row>
        </div>
      )}

      {/* if you need to submit via form */}
      <input type="hidden" name="codes" value={[...selected].join(",")} />
    </div>
  );
};
