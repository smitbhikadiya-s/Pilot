import { InputRef } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useDebounce from "../../hooks/useDebounce";
import InputAtom from "../atoms/input";
import ButtonAtom from "../atoms/button";
import FlexAtom from "../atoms/flex";

// Define what the parent can call using the ref
export interface SearchToggleInputRef {
  reset: () => void;
}

interface SearchToggleInputProps {
  onSearchChange: (value: string) => void;
}

// Define the forward ref function with types
const SearchToggleInput = forwardRef<SearchToggleInputRef, SearchToggleInputProps>(
  ({ onSearchChange }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef<InputRef>(null);

    const handleDebouncedSearch = useDebounce(value);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValue("");
        setExpanded(false);
      },
    }));

    useEffect(() => {
      onSearchChange(handleDebouncedSearch);
    }, [handleDebouncedSearch]);

    useEffect(() => {
      if (expanded) {
        setTimeout(() => inputRef.current?.focus(), 200);
      }
    }, [expanded]);

    return (
      <FlexAtom
        align="center"
        style={{
          width: expanded ? 274 : 40,
          transition: "all 0.3s ease",
          overflow: "hidden",
          backgroundColor: "#fff",
          borderRadius: 6,
          border: expanded ? "1px solid #d9d9d9" : "none",
          paddingLeft: expanded ? 8 : 0,
          height: 40,
        }}
      >
        {expanded && (
          <InputAtom
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search items..."
            bordered={false}
            style={{ flex: 1 }}
          />
        )}
        <ButtonAtom
          icon={expanded ? <CloseOutlined /> : <SearchOutlined />}
          type="text"
          onClick={() => {
            if (expanded) {
              setExpanded(false);
              setValue("");
              onSearchChange("");
            } else {
              setExpanded(true);
            }
          }}
          style={{
            width: 40,
            height: 40,
            border: "none",
            boxShadow: "none",
          }}
        />
      </FlexAtom>
    );
  }
);

// Add display name for better dev tools/debugging
SearchToggleInput.displayName = "SearchToggleInput";

export default SearchToggleInput;
