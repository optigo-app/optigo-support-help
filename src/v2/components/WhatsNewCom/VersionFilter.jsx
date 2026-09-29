import useAutocomplete from "@mui/material/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/material";
import { releaseNotesData } from "../../constants/releaseNotesData";
import { useMemo } from "react";
import { Root, InputWrapper, Listbox } from "../../constants/styles";

export default function VersionFilter({ onChange, defaultVersion = "All versions" }) {
    const versions = useMemo(() => Object.keys(releaseNotesData), []);
    const { getRootProps, getInputLabelProps, getInputProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } = useAutocomplete({
        id: "customized-version-autocomplete",
        defaultValue: defaultVersion,
        multiple: false,
        options: ["All versions", ...versions],
        getOptionLabel: (option) => option || "",
        onChange: (event, newValue) => {
            if (onChange) {
                onChange(newValue);
            }
        },
    });

    return (
        <Box maxWidth="lg" sx={{ mx: "auto", maxWidth: 900, display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 4 }}>
            <Root>
                <div {...getRootProps()}>
                    <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
                        <input {...getInputProps()} placeholder="Select a version" />
                    </InputWrapper>
                </div>
                {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                        {groupedOptions?.map((option, index) => {
                            const { key, ...optionProps } = getOptionProps({ option, index });
                            return (
                                <li key={key} {...optionProps}>
                                    <span>{option}</span>
                                    <CheckIcon fontSize="small" />
                                </li>
                            );
                        })}
                    </Listbox>
                ) : null}
            </Root>
        </Box>
    );
}
