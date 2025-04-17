import React from "react";

export default function useInput(initialValue =  '', callbackConfigurationProperties) {
    const ref = React.useRef(null);
    const [value, setValue] = React.useState(initialValue);

    const handleInputChange = React.useCallback(({ target } ) => {
        setValue(target?.value);
    }, [])


    return { value, onChange: handleInputChange, ref, ...callbackConfigurationProperties};
}
